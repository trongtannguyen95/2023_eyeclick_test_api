import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { IUser } from '../../shared/services/interfaces/user.interface';
import { RolesService } from './roles.service';
import { AclModel } from '../models/user.model';
import { ActionsService } from '../../systems/services/actions.service';
import { getResourceActionsMetaData } from '../helpers/auth.helper';
import { MyHttpService } from '../../shared/services/http.service';

@Injectable()
export class UsersService extends MBaseService<IUser> {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<IUser>,
        private readonly rolesService: RolesService,
        private readonly actionsService: ActionsService,
        private readonly myHttp: MyHttpService,
    ) {
        super(usersModel);
    }
    async getUserAcls(user: IUser, bitwise = false) {
        if (user.isAdministrator) {
            Logger.log(`Not set role for User ${user.username}`, 'UsersService.getUserAcls', true);
            return await this.getFullAcls(bitwise);
        }
        if (user.roleId) {
            const role = await this.rolesService.findById(user.roleId);
            if (role) {
                if (bitwise) {
                    return this.convertAclsToBitWise(role.acls as AclModel[]);
                } else {
                    return this.convertAcls(role.acls as AclModel[]);
                }
            }
        }
        return {};
    }

    convertAcls(acls: AclModel[]) {
        const convert = {};
        for (const acl of acls) {
            if (acl.module) {
                if (!convert[acl.module]) {
                    convert[acl.module] = {};
                }
                if (acl.resource) {
                    if (!convert[acl.module][acl.resource]) {
                        convert[acl.module][acl.resource] = {};
                    }
                    if (acl.action) {
                        if (!convert[acl.module][acl.resource][acl.action]) {
                            convert[acl.module][acl.resource][acl.action] = acl.permission || 0;
                        }
                    }
                }
            }
        }
        return convert;
    }

    async convertAclsToBitWise(acls: AclModel[]) {
        const resourceActionsList = await getResourceActionsMetaData();
        const convert = {};
        for (const acl of acls) {
            if (acl.module) {
                if (!convert[acl.module]) {
                    convert[acl.module] = {};
                }
                if (acl.resource) {
                    if (!convert[acl.module][acl.resource]) {
                        convert[acl.module][acl.resource] = 0;
                        if (!resourceActionsList[`${acl.module}_${acl.resource}`]) {
                            resourceActionsList[`${acl.module}_${acl.resource}`] = [];
                        }
                    }
                    if (acl.action) {
                        const index = (resourceActionsList[`${acl.module}_${acl.resource}`] as string[]).indexOf(acl.action);
                        const permission = acl.permission || 0; // 0 denied, 1 owner, 2 all,
                        //  if in arrray resourceActionsList[`${acl.module}_${acl.resource}`]
                        if (index >= 0) {
                            // 0 1 2 3 4  5  6
                            // 1 2 4 8 16 32 64
                            if (permission === 2) {
                                const indexAll = (resourceActionsList[`${acl.module}_${acl.resource}`] as string[]).length + index;
                                convert[acl.module][acl.resource] += Math.pow(2, indexAll);
                            } else {
                                convert[acl.module][acl.resource] += Math.pow(2, index); // 1 2 4 8 16 32 ...
                            }
                        }
                    }
                }
            }
        }
        return convert;
    }

    async getFullAcls(bitwise = false): Promise<any> {
        const listAction = await this.getActionList();
        const acls: AclModel[] = [];
        for (const action of listAction) {
            if (action['resourceId'] && action['resourceId']['moduleId']) {
                acls.push({
                    module: action['resourceId']['moduleId']['name'],
                    resource: action['resourceId']['name'],
                    action: action['name'],
                    permission: 2,
                });
            }
        }
        if (bitwise) {
            return this.convertAclsToBitWise(acls);
        } else {
            return this.convertAcls(acls);
        }
    }
    async getActionList() {
        const listAction = await this.actionsService
            .getModel()
            // .find({ status: 1, deleted: 0 })
            .find()
            .select('name resourceId status deleted')
            .populate({
                path: 'resourceId', // get resource
                select: 'name status deleted',
                populate: {
                    path: 'moduleId', // get module
                    select: 'name status deleted',
                },
            })
            .exec();
        return listAction;
    }
}
