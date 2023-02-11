/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, Logger } from '@nestjs/common';
import { Model, Collection, Document, FilterQuery } from 'mongoose';
import { IBaseService } from './models/mservice.interface';
import { ResourceMetaData, FieldModel } from './models/resource-metadata.model';
import { FiltersDto, SortDto, SearchsDto } from './dtos/filters.dto';
import { parseStringToJson } from '~/helpers/util.helper';
import { UserModel } from '~users/models/user.model';
import { getAclFilters } from '~users/helpers/auth.helper';
import { ObjectId } from 'mongodb';

@Injectable()
export class MBaseService<T extends Document> implements IBaseService<T> {
    constructor(private readonly myModel: Model<T>) {}

    raw(filters: object) {
        return this.myModel.find(filters);
    }

    async exportResource(filters: FiltersDto | any, metaData: ResourceMetaData, user?: UserModel, permissionNumber?: number) {
        try {
            const queryFilters = await this.getFilters(filters.filters, metaData, user, permissionNumber);
            const query = this.myModel.find(queryFilters as unknown as FilterQuery<T>);

            const select = this.getFields(metaData, 'list');
            if (select) {
                query.select(select);
            }
            const relates = this.getRelate(metaData);
            if (relates && relates.length > 0) {
                for (const relate of relates) {
                    query.populate(relate);
                }
            }
            const sorts = this.getSorts(filters.sorts);
            if (sorts) {
                query.sort(sorts);
            }

            const limit = parseInt(filters.limit) || 10;
            const page = parseInt(filters.page) || 0;
            query.skip(limit * page);
            query.limit(limit);

            return query.cursor();
        } catch (error) {
            Logger.error(error.message || error.text, MBaseService.name + '.exportResource');
            return false;
        }
    }

    /**
     * get list record form resource metadata and filters
     * @param filters
     * @param metaData
     */
    async listResource(filters: FiltersDto | any, metaData: ResourceMetaData, user?: UserModel, permissionNumber?: number) {
        try {
            const queryFilters = await this.getFilters(filters.filters, metaData, user, permissionNumber);
            // Logger.log(filters);
            // Logger.log(queryFilters, MBaseService.name + '.listResource-queryFiltes');
            const query = this.myModel.find(queryFilters as any);
            const select = this.getFields(metaData, 'list');
            // Logger.log(select);
            if (select) {
                query.select(select);
            }
            const relates = this.getRelate(metaData);
            if (relates && relates.length > 0) {
                for (const relate of relates) {
                    query.populate(relate);
                }
            }
            const sorts = this.getSorts(filters.sorts);
            // Logger.log(sorts, MBaseService.name + '.listResource-sort');
            if (sorts) {
                query.sort(sorts);
            }

            const limit = parseInt(filters.limit) || 10;
            const page = parseInt(filters.page) || 0;
            query.skip(limit * page);
            query.limit(limit);
            const list = await query.exec();
            // console.log(list);
            const total = await this.myModel
                .find(queryFilters as any)
                .countDocuments()
                .exec();

            return { list, total };
        } catch (error) {
            Logger.error(error.message || error.text, MBaseService.name + '.listResource');
            return false;
            // return { list: [], total: 0 };
        }
    }
    getRelate(metaData: ResourceMetaData) {
        const polulateArray = [];
        const relateFields = metaData.fields.filter((field: FieldModel) => field.type === 'relate');
        for (const field of relateFields) {
            const relateObject = {
                path: field.name,
            };
            if (field.relate_select) {
                relateObject['select'] = field.relate_select;
            }
            polulateArray.push(relateObject);
        }
        return polulateArray;
    }
    /**
     * Map query filters field
     * @param filters
     * @param metaData
     */
    async getFilters(filters: SearchsDto | any, metaData: ResourceMetaData, user?: UserModel, permissionNumber?: number) {
        let searchOption = { deleted: 0 };
        const searchFields = metaData.fields.filter((field: FieldModel) => field.search === true);
        if (filters) {
            searchOption = { ...searchOption, ...this.mapSearchFilters(filters, searchFields) };
        }
        if (user) {
            searchOption = this.getExtraFilters(searchOption, user);
            searchOption = await this.getAclFilter(searchOption, user, permissionNumber);
        }

        // Logger.log(filters);
        return searchOption;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mapSearchFilters(filters: SearchsDto | any, searchFields: FieldModel[], user?: UserModel) {
        const mapSearch = {};

        if (filters['or']) {
            // Logger.log(filters['or']);
            const objOrSearch = this.mapSearchFilters(filters['or'], searchFields);
            const arrayOfObjOrSearch = Object.entries(objOrSearch).map((e) => ({ [e[0]]: e[1] }));
            mapSearch['$or'] = arrayOfObjOrSearch;
        }
        if (filters['and']) {
            const objAndSearch = this.mapSearchFilters(filters['and'], searchFields);
            const arrayOfObjAndSearch = Object.entries(objAndSearch).map((e) => ({ [e[0]]: e[1] }));
            mapSearch['$and'] = arrayOfObjAndSearch;
        }
        for (const field of searchFields) {
            const filterValue = filters[field.name];
            if (field.searchOption) {
                if (field.searchOption.operator === 'between') {
                    if (
                        field.searchOption.mapFilters &&
                        field.searchOption.mapFilters['start'] &&
                        filters[field.searchOption.mapFilters['start']]
                    ) {
                        mapSearch[field.name] = !mapSearch[field.name] ? {} : mapSearch[field.name];
                        mapSearch[field.name]['$gte'] = filters[field.searchOption.mapFilters['start']];
                    }
                    if (
                        field.searchOption.mapFilters &&
                        field.searchOption.mapFilters['end'] &&
                        filters[field.searchOption.mapFilters['end']]
                    ) {
                        mapSearch[field.name] = !mapSearch[field.name] ? {} : mapSearch[field.name];
                        mapSearch[field.name]['$lte'] = filters[field.searchOption.mapFilters['end']];
                    }
                } else if (field.searchOption.operator === 'like') {
                    if (filterValue) {
                        // mapSearch[field.name] = { $regex: '.*' + filterValue + '.*' };
                        mapSearch[field.name] = { $regex: new RegExp(filterValue, 'i') };
                    }
                } else if (field.searchOption.operator === 'inLike') {
                    if (filterValue) {
                        // mapSearch[field.name] = { $regex: '.*' + filterValue + '.*' };
                        mapSearch[field.name] = { $in: [new RegExp(filterValue, 'i')] };
                    }
                } else {
                    if (filterValue) {
                        if (field.searchOption.exists && filterValue === 'false') {
                            mapSearch['$or'] = [
                                {
                                    [field.name]: { ['$' + field.searchOption.operator]: filterValue },
                                },
                                {
                                    [field.name]: { $exists: false },
                                },
                            ];
                        } else {
                            mapSearch[field.name] = { ['$' + field.searchOption.operator]: filterValue };
                        }
                    }
                }
            } else {
                if (filterValue) {
                    mapSearch[field.name] = filterValue;
                }
            }
        }
        return mapSearch;
    }

    async getAclFilter(filters: any, user?: UserModel, permissionNumber?: number) {
        const aclFilters = getAclFilters(user, permissionNumber);
        if (aclFilters !== 'all') {
            filters = { ...filters, ...aclFilters };
        }
        return filters;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getExtraFilters(filters: SearchsDto | any, user?: UserModel) {
        return filters;
    }
    /**
     * Map sorts fields
     * @param sorts
     */
    getSorts(sorts: SortDto[] | any) {
        const sortsPrepair = {};
        if (Array.isArray(sorts)) {
            for (let sort of sorts) {
                if (typeof sort === 'string') {
                    sort = parseStringToJson(sort);
                }
                if (sort && sort['sortKey'] && !sortsPrepair[sort['sortKey']]) {
                    sortsPrepair[sort['sortKey']] = sort['sortValue'] === 'DESC' ? -1 : 1;
                }
            }
        }
        if (typeof sorts === 'string') {
            sorts = parseStringToJson(sorts);
            if (sorts && sorts['sortKey'] && !sortsPrepair[sorts['sortKey']]) {
                sortsPrepair[sorts['sortKey']] = sorts['sortValue'] === 'DESC' ? -1 : 1;
            }
        }

        return sortsPrepair;
    }
    /**
     * get field form metadata config
     * @param metaData
     * @param forAction
     */
    getFields(metaData: ResourceMetaData, forAction?: string) {
        return metaData.fields
            .filter((field: FieldModel) => {
                return field[forAction] === true;
            })
            .reduce((acc, field) => {
                if (!acc[field.name]) {
                    acc[field.name] = 1;
                }
                return acc;
            }, {});
    }

    async detailResource(id: string | number, metaData?: ResourceMetaData) {
        const query = this.myModel.findById(id);
        const select = this.getFields(metaData, 'detail');
        if (select) {
            query.select(select);
        }
        const relates = this.getRelate(metaData);
        if (relates && relates.length > 0) {
            for (const relate of relates) {
                query.populate(relate);
            }
        }
        return await query.exec();
    }

    async upSert(query: T | any, document: T | any) {
        return this.myModel.findOneAndUpdate(query, document, { upsert: true, new: true }).exec();
    }

    async findAll(options?: object): Promise<T[]> {
        return await this.myModel.find(options).exec();
    }

    async findOne(filter: FilterQuery<T>, projection?: any): Promise<T> {
        return await this.myModel.findOne(filter, projection).exec();
    }

    async findById(id: string | number, projection?: any): Promise<T> {
        return await this.myModel.findById(id, projection).exec();
    }

    async create(docs: T | any): Promise<T> {
        const created = new this.myModel(docs);
        return await created.save();
    }

    async createByUser(docs: T | any, userId?: string | ObjectId): Promise<T> {
        if (userId) {
            docs = { ...docs, created: userId, modified: userId };
        }
        const created = new this.myModel(docs);
        return await created.save();
    }

    async createMutil(t: T | any) {
        return await this.myModel.insertMany(t);
    }

    async update(id: string | number, newValue: T | any): Promise<T> {
        return await this.myModel.findByIdAndUpdate(id, { $set: newValue } as any, { new: true }).exec();
    }

    async updateByUser(id: string | number, newValue: T | any, userId?: string): Promise<T> {
        if (userId) {
            newValue = { ...newValue, modified: userId };
        }
        return await this.myModel.findByIdAndUpdate(id, { $set: newValue } as any, { new: true }).exec();
    }

    // Product phuongdd3
    async updateMany(listId: string[], newValue: T | any) {
        return await this.myModel.updateMany({ _id: { $in: listId } as any }, { $set: newValue } as any, { new: true }).exec();
    }

    async delete(id: any, softDelete?: boolean): Promise<boolean> {
        try {
            if (softDelete) {
                await this.update(id, { deleted: 1 });
            } else {
                await this.myModel.findByIdAndRemove(id).exec();
            }
            return true;
        } catch (err) {
            return false;
        }
    }

    // Product phuongdd3
    async deleteMany(listId: any, softDelete?: boolean): Promise<boolean> {
        try {
            if (softDelete) {
                await this.updateMany(listId, { deleted: 1 });
            } else {
                const filter = { _id: { $in: listId } } as any;
                await this.myModel.deleteMany(filter).exec();
            }
            return true;
        } catch (err) {
            return false;
        }
    }
    async findDelete(filter: FilterQuery<T>): Promise<boolean> {
        try {
            await this.myModel.deleteMany(filter).exec();
            return true;
        } catch (err) {
            return false;
        }
    }

    async aggregate(options: any): Promise<any> {
        return this.myModel.aggregate(options).exec();
    }

    async findWithJoin(
        preSelect?: object,
        join?: any,
        where?: object,
        outputSelect?: object,
        sort?: object,
        limit?: number,
        page?: number,
        isCount = false,
    ) {
        const stagesAggregate = [];
        if (preSelect) {
            stagesAggregate.push({
                $project: preSelect,
            });
        }
        if (join) {
            if (Array.isArray(join)) {
                join.forEach((elm) => {
                    stagesAggregate.push({
                        $lookup: elm,
                    });
                });
            } else {
                stagesAggregate.push({
                    $lookup: join,
                });
            }
        }
        if (where) {
            stagesAggregate.push({
                $match: where,
            });
        }
        if (outputSelect) {
            stagesAggregate.push({
                $project: outputSelect,
            });
        }
        if (sort) {
            if (Array.isArray(sort)) {
                sort.forEach((elm) => {
                    stagesAggregate.push({
                        $sort: elm,
                    });
                });
            } else {
                stagesAggregate.push({
                    $sort: sort,
                });
            }
        }

        return await this.findAggregate(stagesAggregate, limit, page, isCount);
    }

    async findWithJoinExtraMatch(
        preSelect?: object,
        join?: any,
        where?: object,
        outputSelect?: object,
        whereExtra?: object,
        sort?: object,
        limit?: number,
        page?: number,
        isCount = false,
    ) {
        const stagesAggregate = [];
        if (preSelect) {
            stagesAggregate.push({
                $project: preSelect,
            });
        }
        if (join) {
            if (Array.isArray(join)) {
                join.forEach((elm) => {
                    stagesAggregate.push({
                        $lookup: elm,
                    });
                });
            } else {
                stagesAggregate.push({
                    $lookup: join,
                });
            }
        }
        if (where) {
            stagesAggregate.push({
                $match: where,
            });
        }
        if (outputSelect) {
            stagesAggregate.push({
                $project: outputSelect,
            });
        }
        if (whereExtra) {
            stagesAggregate.push({
                $match: whereExtra,
            });
        }
        if (sort) {
            stagesAggregate.push({
                $sort: sort,
            });
        }

        return await this.findAggregate(stagesAggregate, limit, page, isCount);
    }

    async findAggregate(joinOptions: any, limit?: number, offset?: number, isCount = false): Promise<T[] | any> {
        const query = [];
        if (Array.isArray(joinOptions)) {
            query.push(...joinOptions);
        } else {
            query.push(joinOptions);
        }
        if (!isCount) {
            if (offset) {
                query.push({
                    $skip: limit * offset,
                });
            }
            if (limit) {
                query.push({
                    $limit: 1 * limit,
                });
            }
        } else {
            query.push({
                $count: 'total',
            });
            const count = await this.myModel.aggregate(query).exec();
            if (count && count.length > 0) {
                return count[0].total;
            } else {
                return 0;
            }
        }
        // Logger.log('Run find With Join', MongoBaseService.name);
        // Logger.log(query, MongoBaseService.name);

        return await this.myModel.aggregate(query).exec();
    }

    public getCollection(): Collection {
        return this.myModel.collection;
    }

    public getModel(): Model<T> {
        return this.myModel;
    }
}
