import { resolve } from 'path';
import { Logger } from '@nestjs/common';
import { scanFiles } from '~/helpers/util.helper';
import { ResourceMetaData } from '~base/models/resource-metadata.model';
import { UserModel, AclModel } from '../models/user.model';

export async function getResourceActionsMetaData() {
    if (!(global as any).resourceActions) {
        const resourceActions = {};
        const files = (await scanFiles('**/*.metadata.ts', { cwd: resolve('./src/modules') })) as string[];
        if (files && files.length > 0) {
            for (const sFile of files) {
                // Logger.debug(resolve('./src/modules') + '/' + sFile.replace('.ts', ''));
                const fileContent = await import('../../' + sFile.replace('.ts', ''));
                const metaData = fileContent[Object.keys(fileContent)[0]] as ResourceMetaData;
                if (metaData && metaData.resource && metaData.module && metaData.actions) {
                    if (resourceActions[`${metaData.module}_${metaData.resource}`]) {
                        resourceActions[`${metaData.module}_${metaData.resource}`] = {};
                    }
                    resourceActions[`${metaData.module}_${metaData.resource}`] = metaData.actions;
                }
            }
        }
        (global as any).resourceActions = resourceActions;
    }
    return (global as any).resourceActions;
}
export function checkAuth(user: UserModel, aclCheck: AclModel): number {
    // Logger.debug(user, 'CheckAuthHelper');
    // Logger.debug(aclCheck, 'CheckAuthHelper');
    if (user) {
        if (user.isAdministrator) {
            return 2;
        } else {
            const resourceActionsList = (global as any).resourceActions;
            const resourceAction: string[] = resourceActionsList[`${aclCheck.module}_${aclCheck.resource}`] || [];

            if (user.acls && user.acls[aclCheck.module] && user.acls[aclCheck.module][aclCheck.resource]) {
                const index = resourceAction.indexOf(aclCheck.action);
                if (index >= -2) {
                    const indexAll = resourceAction.length + index;
                    const permissionCheck = Math.pow(2, index);
                    const permissionCheckAll = Math.pow(2, indexAll);
                    // Logger.debug(permissionCheckAll, 'checkAuthBitwise.all');
                    // Logger.debug(permissionCheck, 'checkAuthBitwise.owner');
                    // Logger.debug(user.acls[aclCheck.module][aclCheck.resource], 'checkAuthBitwise.userPermission');
                    // tslint:disable-next-line: no-bitwise
                    if (user.acls[aclCheck.module][aclCheck.resource] & permissionCheckAll) {
                        return 2;
                    }
                    // tslint:disable-next-line: no-bitwise
                    if (user.acls[aclCheck.module][aclCheck.resource] & permissionCheck) {
                        return 1;
                    }
                }
            }
        }
    }
    return 0;
}
export function checkAuthDepth(user: UserModel, userCreateRecord: string, authPermissionNumber: number) {
    if (authPermissionNumber === 1) {
        if (userCreateRecord && user && user.id === userCreateRecord) {
            return 1;
        } else {
            return 0;
        }
    }
    return authPermissionNumber;
}
export function checkAuthObj(user: UserModel, aclCheck: AclModel): number {
    Logger.debug(user, 'CheckAuthHelper');
    Logger.debug(aclCheck, 'CheckAuthHelper');
    if (user) {
        if (user.isAdministrator) {
            return 3;
        } else {
            if (
                user.acls &&
                user.acls[aclCheck.module] &&
                user.acls[aclCheck.module][aclCheck.resource] &&
                user.acls[aclCheck.module][aclCheck.resource][aclCheck.action]
            ) {
                return user.acls[aclCheck.module][aclCheck.resource][aclCheck.action];
            }
        }
    }
    return 0;
}

export function getAclFilters(user: UserModel, authPermissionNumber: number) {
    let aclFilter = {};
    if (authPermissionNumber === 1) {
        // for owner
        aclFilter = {
            created: user ? user.id : false,
        };
    } else if (authPermissionNumber === 2) {
        // for all
        aclFilter = 'all';
    } else {
        // for none
        aclFilter = {
            created: 'none',
        };
    }
    return aclFilter;
}

export function getAclFiltersDepth(listFieldFilterIdsCreatedByUser: string[], authPermissionNumber: number, fieldFilter: string) {
    let aclFilter = {};
    if (authPermissionNumber === 1) {
        // for owner
        aclFilter = {
            [fieldFilter]: { $in: listFieldFilterIdsCreatedByUser },
        };
    } else if (authPermissionNumber === 2) {
        // for all
        aclFilter = 'all';
    } else {
        // for none
        aclFilter = {
            created: 'none',
        };
    }
    return aclFilter;
}
