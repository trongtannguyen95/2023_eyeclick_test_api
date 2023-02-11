import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    Ip,
    Logger,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IUser } from '~shared/services/interfaces/user.interface';
import { UserParams } from '~users/decorators/user-params.decorator';
import { AuthGuard } from '~users/guards/auth.guard';
import { checkAuth, checkAuthDepth } from '~users/helpers/auth.helper';
import { UserModel } from '~users/models/user.model';
import { BaseDto, DeleteMultiDto } from './dtos/base.dto';
import { FiltersDto } from './dtos/filters.dto';
import { IBaseService } from './models/mservice.interface';
import { ResourceMetaData, FieldModel } from './models/resource-metadata.model';
import { IBaseController, BaseConstructor, IBaseControllerHooks, IBaseAuditData } from './models/base-controller.interface';
import { ResponseBody } from './models/response-body.model';
import { UserActivitiesService } from '~users/services/user-activities.service';
import { createHooks, Hookable, HookKeys } from 'hookable';
import exceljs from 'exceljs';
import diff from 'microdiff';
import dayjs from 'dayjs';

interface BaseControllerOptions {
    isAuth: boolean; // use authenticate, or not.
    metaData: ResourceMetaData; // metadata, colum fields, config of resource
    cFiltersDto?: any; // dto for filters search list resource
    cCreateDto?: any; // dto for create resource
    cUpdateDto?: any; // dto for update resource
}

export const ControllerBaseDecorator = (options: BaseControllerOptions): ClassDecorator => {
    return (target) => {
        if (options.isAuth) {
            UseGuards(AuthGuard)(target);
            ApiBearerAuth()(target);
        }
        Controller(options.metaData.resource)(target);
        ApiTags(`${options.metaData.module} - ${options.metaData.resource} resource`)(target);

        return target;
    };
};

export function BaseControllerFactory<T extends Document>(options: BaseControllerOptions): BaseConstructor {
    class CFiltersDto extends (options.cFiltersDto ? options.cFiltersDto : FiltersDto) {}
    class UpdateDto extends (options.cUpdateDto ? options.cUpdateDto : BaseDto) {}
    class CreateDto extends (options.cCreateDto ? options.cCreateDto : BaseDto) {}

    Object.defineProperty(CFiltersDto, 'name', {
        value: options.cFiltersDto !== undefined ? options.cFiltersDto.name : FiltersDto.name,
    });
    Object.defineProperty(UpdateDto, 'name', {
        value: options.cUpdateDto ? options.cUpdateDto.name : BaseDto.name,
    });
    Object.defineProperty(CreateDto, 'name', {
        value: options.cCreateDto ? options.cCreateDto.name : BaseDto.name,
    });

    @ControllerBaseDecorator(options)
    @Injectable()
    class BaseController implements IBaseController {
        metaData: ResourceMetaData;
        hooks: Hookable<IBaseControllerHooks>;

        @Inject(UserActivitiesService)
        private _userActivitiesService: UserActivitiesService;

        protected readonly service: IBaseService<T>;

        constructor(service: IBaseService<T>) {
            this.service = service;
            this.metaData = options.metaData;
            this.hooks = createHooks();
        }

        addHook(name: HookKeys<IBaseControllerHooks>, fn: any) {
            return this.hooks.hook(name, fn.bind(this));
        }

        @Get()
        @ApiOperation({ description: `Api list` })
        @ApiResponse({ status: 200, description: 'Ok' })
        async list(
            @Query() filters: CFiltersDto,
            @Res() res: Response,
            @Ip() ipv4: string,
            @Headers('user-agent') ua: string,
            @UserParams() user?: UserModel,
        ): Promise<Response> {
            const permission = this.checkAuth(user, 'list');
            const response: ResponseBody = {
                statusCode: 200,
                data: null,
                message: null,
            };
            try {
                const data = await this.service.listResource(filters, this.metaData, user, permission);
                this.audit({ action: 'list', data: filters, userId: user?.id, ipv4, ua });
                response.message = 'Ok';

                if (data) {
                    response.data = data;
                } else {
                    response.data = { list: [], total: 0 };
                }

                return res.status(HttpStatus.OK).json(response);
            } catch (error) {
                response.statusCode = 500;
                Logger.error(error.message || error.text, 'Catch.errors');
                response.message = 'Opps! Something went wrong.';
                return res.status(HttpStatus.OK).json(response);
            }
        }

        @Get('export')
        @ApiOperation({ description: `Api export` })
        @ApiResponse({ status: 200, description: 'Ok' })
        async export(
            @Query() filters: CFiltersDto,
            @Res() res: Response,
            @Ip() ipv4: string,
            @Headers('user-agent') ua: string,
            @UserParams() user?: UserModel,
        ): Promise<Response> {
            Logger.log(filters, 'BaseController.export');
            const permission = this.checkAuth(user, 'export');
            const response: ResponseBody = {
                statusCode: 200,
                data: null,
                message: null,
            };
            try {
                const dataCursor = await this.service.exportResource(filters, this.metaData, user, permission);
                this.audit({ action: 'export', data: filters, userId: user.id, ipv4, ua });
                if (!dataCursor) {
                    response.statusCode = 404;
                    response.message = 'not found data , error query';
                    return res.status(HttpStatus.OK).json(response);
                } else {
                    const fileName = `export_${this.metaData.resource}_${dayjs().unix()}`;
                    res.status(200);
                    res.setHeader('Content-disposition', `attachment; filename=${fileName}.xlsx`);
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    const optionsEx = {
                        stream: res, // write to server response
                        useStyles: false,
                        useSharedStrings: false,
                    };
                    const workbook = new exceljs.stream.xlsx.WorkbookWriter(optionsEx);
                    const worksheet = workbook.addWorksheet('export_data');
                    const columns =
                        this.service['exportMetaData'] ||
                        this.metaData.fields
                            .filter((field: FieldModel) => {
                                return field['list'] === true || field['export'] === true;
                            })
                            .reduce((acc, field) => {
                                acc.push({ header: field['name'], key: field['name'], width: 30 });
                                return acc;
                            }, []);
                    worksheet.columns = columns;
                    dataCursor.on('data', (doc: { [x: string]: any }) => {
                        // doc.toArray();
                        if (this.service['exportMapData']) {
                            doc = this.service['exportMapData'](doc);
                        }
                        worksheet.addRow(doc).commit();
                    });

                    dataCursor.on('error', (err: any) => {
                        console.log(err);
                        res.end(); // manual end res
                    });

                    dataCursor.on('end', () => {
                        workbook.commit(); // auto end res
                    });
                }
            } catch (error) {
                response.statusCode = 500;
                Logger.error(error.message || error.text, BaseController.name);
                response.message = 'Opps! Something went wrong.';
                return res.status(HttpStatus.OK).json(response);
            }
        }

        @Get('metadata')
        @ApiOperation({ description: `Api get resource metadata` })
        @ApiResponse({ status: 200, description: 'Ok' })
        async resourceMetadata(
            @Res() res: Response,
            @Ip() ipv4: string,
            @Headers('user-agent') ua: string,
            @UserParams() user: UserModel,
        ): Promise<Response> {
            this.checkAuth(user, 'list');
            const response: ResponseBody = {
                statusCode: 200,
                data: null,
                message: null,
            };
            try {
                const data = this.metaData.fields;
                this.audit({ action: 'resourceMetadata', data: data, userId: user.id, ipv4, ua });
                response.message = 'Ok';
                response.data = data;
                return res.status(HttpStatus.OK).json(response);
            } catch (error) {
                response.statusCode = 500;
                Logger.error(error.message || error.text, BaseController.name);
                response.message = 'Opps! Something went wrong.';
                return res.status(HttpStatus.OK).json(response);
            }
        }

        @Get(':id')
        @ApiOperation({ description: `Api detail` })
        @ApiResponse({ status: 200, description: 'Entity retrieved successfully.' })
        async detail(
            @Param('id') id: string,
            @Res() res: Response,
            @Ip() ipv4: string,
            @Headers('user-agent') ua: string,
            @UserParams() user: UserModel,
        ): Promise<Response> {
            const response: ResponseBody = {
                statusCode: 200,
                data: null,
                message: 'success',
            };
            const permission = this.checkAuth(user, 'detail');
            try {
                const record = await this.service.detailResource(id, this.metaData);
                this.audit({ action: 'detail', resourceId: id, userId: user?.id, ipv4, ua });
                await this.hooks.callHook('retrieved', record, user);
                if (!record) {
                    response.statusCode = 404;
                    response.message = 'empty record info!';
                } else {
                    this.checkAuthRecord(user, record.created, permission);
                    response.data = record;
                }
                return res.status(HttpStatus.OK).json(response);
            } catch (error) {
                response.statusCode = 500;
                Logger.error(error.message || error.text, BaseController.name);
                response.message = 'Opps! Something went wrong.';
                return res.status(HttpStatus.OK).json(response);
            }
        }

        @Post()
        @ApiOperation({ description: `Api create` })
        @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
        @ApiResponse({ status: 403, description: 'Forbidden.' })
        @ApiResponse({ status: 400, description: 'Bad Request.' })
        async create(
            @Body() entity: CreateDto,
            @Res() res: Response,
            @Ip() ipv4: string,
            @Headers('user-agent') ua: string,
            @UserParams() user: UserModel,
        ): Promise<Response> {
            const response: ResponseBody = {
                statusCode: 200,
                data: null,
                message: 'success',
            };
            Logger.log(user, 'create.checkUser');
            this.checkAuth(user, 'create');
            try {
                const beContinued1 = await this.hooks.callHookParallel('creating', entity, user);
                const beContinued2 = await this.hooks.callHookParallel('saving', entity, null, user);
                if ([...beContinued1, ...beContinued2].every((v) => v !== false)) {
                    try {
                        const record = await this.service.createByUser(entity, user.id);
                        this.audit({ action: 'create', data: record, resourceId: record.id, userId: user.id, ipv4, ua });
                        await this.hooks.callHook('created', record, user);
                        await this.hooks.callHook('saved', record, user);
                        response.data = record;
                    } catch (error) {
                        console.log(error.message);
                        response.statusCode = 400;
                    }
                } else {
                    response.statusCode = 400;
                    response.message = 'Creation has been aborted';
                }
            } catch (error) {
                response.statusCode = 500;
                Logger.error(error.message || error.text, BaseController.name);
                response.message = 'Opps! Something went wrong.';
            }
            return res.status(HttpStatus.OK).json(response);
        }

        @Put(':id')
        @ApiOperation({ description: `Api update` })
        @ApiResponse({ status: 400, description: 'Bad Request.' })
        @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
        async update(
            @Param('id') id: string,
            @Body() entity: UpdateDto,
            @Res() res: Response,
            @Ip() ipv4: string,
            @Headers('user-agent') ua: string,
            @UserParams() user: UserModel,
        ): Promise<Response> {
            const response: ResponseBody = {
                statusCode: 200,
                data: null,
                message: 'success',
            };
            const permission = this.checkAuth(user, 'update');
            try {
                const recordInfo = await this.service.findById(id);
                if (recordInfo) {
                    this.checkAuthRecord(user, recordInfo['created'], permission);
                    const beContinued1 = await this.hooks.callHookParallel('updating', entity, recordInfo, user);
                    const beContinued2 = await this.hooks.callHookParallel('saving', entity, recordInfo, user);
                    if ([...beContinued1, ...beContinued2].every((v) => v !== false)) {
                        try {
                            const record = await this.service.updateByUser(id, entity, user.id);
                            const differences = diff(recordInfo.toObject(), record.toObject());
                            this.audit({ action: 'update', data: differences, resourceId: record.id, userId: user.id, ipv4, ua });
                            await this.hooks.callHook('updated', record, user);
                            await this.hooks.callHook('saved', record, user);
                            response.data = record;
                        } catch (error) {
                            console.log(error.message);
                            response.statusCode = 400;
                            response.message = 'Bad request';
                        }
                    } else {
                        response.statusCode = 400;
                        response.message = 'The update has been aborted';
                    }
                } else {
                    response.statusCode = 404;
                    response.message = 'Not found';
                }

                return res.status(HttpStatus.OK).json(response);
            } catch (error) {
                response.statusCode = 500;
                Logger.error(error.message || error.text, BaseController.name);
                response.message = 'Opps! Something went wrong.';
                return res.status(HttpStatus.OK).json(response);
            }
        }

        @Delete(':id')
        @ApiOperation({ description: `Api delete` })
        @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
        @ApiResponse({ status: 400, description: 'Bad Request.' })
        async delete(
            @Param('id') id: string,
            @Res() res: Response,
            @Ip() ipv4: string,
            @Headers('user-agent') ua: string,
            @UserParams() user: UserModel,
        ) {
            const response: ResponseBody = {
                statusCode: 200,
                data: null,
                message: 'success',
            };
            const permission = this.checkAuth(user, 'delete');
            try {
                const recordInfo = await this.service.findById(id);
                if (recordInfo) {
                    this.checkAuthRecord(user, recordInfo['created'], permission);
                    const beContinued = await this.hooks.callHookParallel('deleting', recordInfo, user);
                    if (beContinued.every((s) => s !== false)) {
                        const result: boolean = await this.service.delete(id, options.metaData.softDelete);
                        this.audit({ action: 'delete', data: recordInfo, resourceId: id, userId: user.id, ipv4, ua });
                        if (result) {
                            await this.hooks.callHook('deleted', recordInfo, user);
                        } else {
                            response.statusCode = 400;
                            response.message = 'Bad request';
                        }

                        response.data = result;
                    } else {
                        response.statusCode = 400;
                        response.message = 'Deletion has been aborted';
                    }
                } else {
                    response.statusCode = 404;
                    response.message = 'Not found';
                }

                return res.status(HttpStatus.OK).json(response);
            } catch (error) {
                response.statusCode = 500;
                Logger.error(error.message || error.text, BaseController.name);
                response.message = 'Opps! Something went wrong.';

                return res.status(HttpStatus.OK).json(response);
            }
        }

        @Post('delete-multi')
        @ApiOperation({ description: `Api delete multiple` })
        @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
        @ApiResponse({ status: 400, description: 'Bad Request.' })
        async deleteMulti(
            @Res() res: Response,
            @Body() deleteMultiDto: DeleteMultiDto,
            @Ip() ipv4: string,
            @Headers('user-agent') ua: string,
            @UserParams() user?: UserModel,
        ) {
            const response: ResponseBody = {
                statusCode: 200,
                data: null,
                message: 'success',
            };
            this.checkAuth(user, 'delete-multi');
            try {
                const check = await this.service.getModel().updateMany({ _id: { $in: deleteMultiDto.listIds } }, { $set: { deleted: 1 } });
                if (check) {
                    this.audit({ action: 'delete', data: deleteMultiDto, userId: user.id, ipv4, ua });
                } else {
                    response.statusCode = 400;
                    response.message = 'Delete multi errors';
                }
                return res.status(HttpStatus.OK).json(response);
            } catch (error) {
                response.statusCode = 500;
                Logger.error(error.message || error.text, BaseController.name);
                response.message = 'Opps! Something went wrong.';

                return res.status(HttpStatus.OK).json(response);
            }
        }

        checkAuth(user: UserModel, action: string) {
            if (options.isAuth) {
                const check = checkAuth(user, {
                    module: options.metaData.module,
                    resource: options.metaData.resource,
                    action: action,
                });
                // Logger.log(check, 'checkAuth');
                if (!check) {
                    throw new HttpException('Permission denied', HttpStatus.UNAUTHORIZED);
                }
                return check;
            }
            return 2;
        }

        checkAuthRecord(user: UserModel, createdUser: string | ObjectId | Partial<IUser>, permission: number) {
            if (options.isAuth && createdUser) {
                let screatedUser = '';
                if (typeof createdUser === 'string') {
                    screatedUser = createdUser;
                } else if (createdUser instanceof ObjectId) {
                    screatedUser = createdUser.toString();
                } else {
                    screatedUser = createdUser.id || createdUser._id.toString();
                }

                const check = checkAuthDepth(user, screatedUser, permission);

                if (!check) {
                    throw new HttpException('Permission denied , you do not have permission for this record', HttpStatus.UNAUTHORIZED);
                }
                return check;
            }
            return 2;
        }

        async audit(args: IBaseAuditData) {
            if (options.metaData) {
                const auditActions = Array.isArray(options.metaData.auditActions)
                    ? options.metaData.auditActions
                    : options.metaData.actions;

                if (auditActions.includes(args.action)) {
                    await this._userActivitiesService.audit({
                        ...args,
                        resource: options.metaData.resource,
                        module: options.metaData.module,
                    });
                }
            }
        }
    }

    return BaseController;
}
