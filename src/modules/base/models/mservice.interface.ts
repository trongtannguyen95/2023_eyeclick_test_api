import { ResourceMetaData } from './resource-metadata.model';
import { FiltersDto } from '../dtos/filters.dto';
import { Model } from 'mongoose';
import { UserModel } from '../../users/models/user.model';

export interface IBaseService<T> {
    findAll(filter: any): Promise<T[]>;
    findById(id: string | number): Promise<T>;
    create(entity: T | any): Promise<T>;
    createByUser(entity: T | any, userID?: string): Promise<T>;
    update(id: string | number, entity: T | any): Promise<T>;
    updateByUser(id: string | number, entity: T | any, userID?: string): Promise<T>;
    delete(id: string | number, softDelete?: boolean): any;

    listResource(filters: FiltersDto | any, metaData: ResourceMetaData, user?: UserModel, permission?: number): any;
    detailResource(id: string | number, metaData?: ResourceMetaData): any;
    exportResource(filters: FiltersDto | any, metaData: ResourceMetaData, user?: UserModel, permission?: number): any;
    getAclFilter(filters: any, user?: UserModel, permissionNumber?: number): any;
    getModel(): Model<any>;
    getFields(metaData: ResourceMetaData, forAction?: string): any;
}
