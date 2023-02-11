import { resolve } from 'path';
import { Logger } from '@nestjs/common';
import { scanFiles } from '~/helpers/util.helper';
import { ResourceMetaData } from '~base/models/resource-metadata.model';
import { UserModel } from '../models/user.model';

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
export function checkAuth(user: UserModel): number {
    if (user) {
        if (user.isAdministrator) {
            return 2;
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
