import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BaseControllerFactory } from '../../base/base.controller';
import { IRole } from '../../shared/services/interfaces/role.interface';
import { RolesService } from '../services/roles.service';
import { RoleCreateDto, RoleUpdateDto, RoleFilterDto, RoleCreateAclDto, RoleDeleteAclDto } from '../dtos/role.dto';
import { RolesResourceMetadata } from '../../users/metadatas/role.metadata';
import { Injectable, Get, HttpStatus, Res, Post, Body, Put, Delete } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { Response } from 'express';
import { ResponseBody } from '../../base/models/response-body.model';
import { UserParams } from '../decorators/user-params.decorator';
import { getAclFilters } from '../helpers/auth.helper';

const BaseController = BaseControllerFactory<IRole>({
    isAuth: true,
    metaData: RolesResourceMetadata,
    cFiltersDto: RoleFilterDto,
    cCreateDto: RoleCreateDto,
    cUpdateDto: RoleUpdateDto,
});

@Injectable()
export class RolesController extends BaseController {
    constructor(private readonly rolesService: RolesService) {
        super(rolesService);

        this.addHook('saving', this.checkOverlapAcls);
    }

    @Get('/listAll')
    @ApiOperation({ description: `Api list all` })
    @ApiResponse({ status: 200, description: 'Ok' })
    async listAll(@Res() res: Response, @UserParams() user: UserModel): Promise<Response> {
        const response: ResponseBody = {
            statusCode: 200,
            data: null,
            message: null,
        };
        try {
            const persmission = this.checkAuth(user, 'list');
            const aclFilters = getAclFilters(user, persmission);

            let filters = { status: 1, deleted: 0 };
            if (aclFilters !== 'all') {
                filters = { ...aclFilters, ...filters };
            }

            const data = await this.rolesService.getModel().find(filters).select('name description').exec();
            response.message = 'Ok';
            response.data = data;
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            response.statusCode = 500;
            response.message = error.message || error.text;
            return res.status(HttpStatus.OK).json(response);
        }
    }

    private checkOverlapAcls(entity: RoleCreateDto) {
        const { acls } = entity;
        if (Array.isArray(acls)) {
            for (let i = 0; i < acls.length; i++) {
                for (let j = i + 1; j < acls.length; j++) {
                    if (acls[i].action === acls[j].action && acls[i].module === acls[j].module && acls[i].resource === acls[j].resource) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    @Post('/acl')
    @ApiOperation({ description: `Api create acl into role` })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
    async createAcl(@Body() entity: RoleCreateAclDto, @Res() res: Response, @UserParams() user: UserModel): Promise<Response> {
        const response: ResponseBody = {
            statusCode: 200,
            data: null,
            message: 'Create ACL success.',
        };
        this.checkAuth(user, 'create');
        try {
            const { role_id, acl } = entity;
            const role = await this.rolesService.findById(role_id);
            // Logger.log(role)
            let acls = role.acls;

            // Lay danh sach module & resource de giam so luong so sanh.
            const aclMapping = acls.filter((e) => {
                if (e['module'] === acl[0]['module'] && e['resource'] === acl[0]['resource']) {
                    return e;
                }
            });

            const overlapAction = [];
            if (aclMapping.length !== 0) {
                let checkOverlap = false;
                for (let i = 0; i < acl.length; i++) {
                    for (let j = 0; j < aclMapping.length; j++) {
                        if (acl[i]['action'] === aclMapping[j]['action']) {
                            overlapAction.push(acl[i]['action']);
                            checkOverlap = true;
                            break;
                        }
                    }

                    if (!checkOverlap) {
                        acls.push(acl[i]);
                        checkOverlap = false;
                    }
                }
            } else {
                acls = [...acls, ...acl];
            }

            const record = await this.rolesService.updateByUser(role_id, { acls }, user.id);
            response.data = record;
            if (!record) {
                response.statusCode = 400;
                response.message = 'Bad request';
            } else {
                console.log('overlapAction: ', overlapAction);
                if (overlapAction.length > 0) {
                    response.message = 'We have some action overlap: ' + overlapAction.toString();
                }
            }

            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            response.statusCode = 500;
            response.message = error.message || error.text;

            return res.status(HttpStatus.OK).json(response);
        }
    }

    @Put('/acl')
    @ApiOperation({ description: `Api create acl into role` })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
    async updateAcl(@Body() entity: RoleCreateAclDto, @Res() res: Response, @UserParams() user: UserModel): Promise<Response> {
        const response: ResponseBody = {
            statusCode: 200,
            data: null,
            message: 'success',
        };
        this.checkAuth(user, 'update');
        try {
            const { role_id, acl } = entity;
            const role = await this.rolesService.findById(role_id);
            // Logger.log(role)
            const acls = role['acls'];

            let checkOverlap = -1;
            for (let i = 0; i < acls.length; i++) {
                if (acls[i]['module'] === acl['module'] && acls[i]['resource'] === acl['resource'] && acls[i]['action'] === acl['action']) {
                    checkOverlap = i;
                    break;
                }
            }

            if (checkOverlap >= 0) {
                acls[checkOverlap] = acl;
                const record = await this.rolesService.updateByUser(role_id, { acls }, user.id);
                response.data = record;
                if (!record) {
                    response.statusCode = 400;
                    response.message = 'Bad request';
                }
                return res.status(HttpStatus.OK).json(response);
            }

            return res.status(HttpStatus.OK).json({ statusCode: 400, message: `Don't find acl for update` });
        } catch (error) {
            response.statusCode = 500;
            response.message = error.message || error.text;

            return res.status(HttpStatus.OK).json(response);
        }
    }

    @Delete('/acl')
    @ApiOperation({ description: `Api create acl into role` })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 200, description: 'Entity deleted successfully.' })
    async DeleteAcl(@Body() entity: RoleDeleteAclDto, @Res() res: Response, @UserParams() user: UserModel): Promise<Response> {
        const response: ResponseBody = {
            statusCode: 200,
            data: null,
            message: 'success',
        };
        this.checkAuth(user, 'delete');
        try {
            const { role_id, acl_delete } = entity;
            const role = await this.rolesService.findById(role_id);
            const acls_role = role['acls'];

            const acls_after = acls_role.filter((el) => {
                return (
                    acl_delete.filter((anotherOne_el) => {
                        return (
                            anotherOne_el['module'] === el['module'] &&
                            anotherOne_el['resource'] === el['resource'] &&
                            anotherOne_el['action'] === el['action']
                        );
                    }).length === 0
                );
            });

            const record = await this.rolesService.updateByUser(role_id, { acls: acls_after }, user.id);
            response.data = record;
            if (!record) {
                response.statusCode = 400;
                response.message = 'Bad request';
            }
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            response.statusCode = 500;
            response.message = error.message || error.text;

            return res.status(HttpStatus.OK).json(response);
        }
    }
}
