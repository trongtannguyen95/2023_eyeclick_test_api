import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SettingsService } from '../services/settings.service';
import { BaseControllerFactory } from '../../base/base.controller';
import { ISetting } from '../../shared/services/interfaces/setting.interface';
import { SettingsResourceMetadata } from '../metadatas/settings.metadata';
import { SettingCreateDto, SettingUpdateDto, SettingsFiltersDto } from '../dtos/settings.dto';
import { Injectable, Logger, Get, Res, HttpStatus } from '@nestjs/common';
import { scanFiles } from '../../../helpers/util.helper';
import { resolve } from 'path';
import { Response } from 'express';
import { ResponseBody } from '../../base/models/response-body.model';
import { ResourceMetaData } from '../../base/models/resource-metadata.model';
import { ActionsService } from '../services/actions.service';
import { RolesService } from '../../users/services/roles.service';
import { UsersService } from '../../users/services/users.service';
import { hashSync } from 'bcrypt';
import { UserParams } from '../../users/decorators/user-params.decorator';
import { UserModel } from '../../users/models/user.model';

const BaseController = BaseControllerFactory<ISetting>({
    isAuth: true,
    metaData: SettingsResourceMetadata,
    cFiltersDto: SettingsFiltersDto,
    cCreateDto: SettingCreateDto,
    cUpdateDto: SettingUpdateDto,
});

@Injectable()
export class SettingsController extends BaseController {
    constructor(
        private readonly settingsService: SettingsService,
        private readonly actionsService: ActionsService,
        private readonly rolesService: RolesService,
        private readonly usersService: UsersService,
    ) {
        super(settingsService);
    }
    @Get('sync-metadata')
    @ApiOperation({ description: `Api sync modules/ resouces/ actions` })
    @ApiResponse({ status: 200, description: 'Ok' })
    async syncResourceMetadatas(@Res() res: Response, @UserParams() user: UserModel) {
        const responseBody: ResponseBody = {
            statusCode: 200,
            data: null,
            message: null,
            error: null,
        };
        try {
            this.checkAuth(user, 'syncResource');
            const files = (await scanFiles('**/*.metadata.ts', { cwd: resolve('./src/modules') })) as string[];
            if (files && files.length > 0) {
                for (const sFile of files) {
                    Logger.debug(resolve('./src/modules') + '/' + sFile.replace('.ts', ''));
                    const fileContent = await import('../../' + sFile.replace('.ts', ''));
                    // Logger.debug(fileContent[Object.keys(fileContent)[0]]);
                    const metaData = fileContent[Object.keys(fileContent)[0]] as ResourceMetaData;
                    await this.settingsService.syncMetadatas(metaData);
                    // const fileContent = await import(resolve('./src/modules/') + sFile);
                }
            }
            responseBody.message = 'Ok';
            return res.status(HttpStatus.OK).json(responseBody);
        } catch (error) {
            responseBody.statusCode = 500;
            responseBody.error = error.message || error.text;
            return res.status(HttpStatus.OK).json(responseBody);
        }
    }
    @Get('seedding-base-db')
    @ApiOperation({ description: `Api init base database` })
    @ApiResponse({ status: 200, description: 'Ok' })
    async seeddingDatabase(@Res() res: Response, @UserParams() user: UserModel) {
        const responseBody: ResponseBody = {
            statusCode: 200,
            data: null,
            message: null,
            error: null,
        };
        try {
            const roles = [
                { name: 'admin', defaultPermission: 2 },
                { name: 'staff', defaultPermission: 1 },
                { name: 'guess', defaultPermission: 0 },
            ];
            this.checkAuth(user, 'initBaseData');
            const listAction = await this.actionsService
                .getModel()
                .find({ status: 1, deleted: 0 })
                .select('name resourceId status')
                .populate({
                    path: 'resourceId', // get resource
                    select: 'name status deleted',
                    populate: {
                        path: 'moduleId', // get module
                        select: 'name status deleted',
                    },
                })
                .exec();
            for (const role of roles) {
                const acls = [];
                for (const action of listAction) {
                    if (action['resourceId'] && action['resourceId']['moduleId']) {
                        acls.push({
                            module: action['resourceId']['moduleId']['name'],
                            resource: action['resourceId']['name'],
                            action: action['name'],
                            permission: role.defaultPermission,
                        });
                    }
                }
                const checkSaveRole = await this.rolesService.upSert(
                    { name: role.name },
                    {
                        name: role.name,
                        description: `${role.name} in system`,
                        status: 1,
                        deleted: 0,
                        acls: acls,
                        created: user.id,
                        modified: user.id,
                    },
                );
                if (checkSaveRole) {
                    const username = `${role.name}_user`;
                    const email = `${role.name}_user@user.com`;
                    const password = `${role.name}_user@2019`;
                    await this.usersService.upSert(
                        { username: username, email: email },
                        {
                            name: role.name,
                            username: username,
                            email: email,
                            password: hashSync(password, 10),
                            status: 1,
                            roleId: checkSaveRole.id,
                            deleted: 0,
                            created: user.id,
                            modified: user.id,
                        },
                    );
                }
            }
            responseBody.message = 'init success';
            return res.status(HttpStatus.OK).json(responseBody);
        } catch (error) {
            responseBody.statusCode = 500;
            responseBody.error = error.message || error.text;
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseBody);
        }
    }
}
