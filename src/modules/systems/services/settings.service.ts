import { Injectable, Logger } from '@nestjs/common';
import { MBaseService } from '../../base/mbase.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISetting } from '../../shared/services/interfaces/setting.interface';
import { ResourceMetaData } from '../../base/models/resource-metadata.model';
import { ModulesService } from './modules.service';
import { ResourcesService } from './resources.service';
import { ActionsService } from './actions.service';

@Injectable()
export class SettingsService extends MBaseService<ISetting> {
    constructor(
        @InjectModel('Settings') private readonly settingsModel: Model<ISetting>,
        private readonly modulesService: ModulesService,
        private readonly resourcesService: ResourcesService,
        private readonly actionsService: ActionsService,
    ) {
        super(settingsModel);
    }
    async getSettingValueByKey(key: string): Promise<ISetting> {
        return this.settingsModel.findOne({ key: key }).select('value').exec();
    }
    async syncMetadatas(metaData: ResourceMetaData): Promise<boolean> {
        Logger.log(metaData, 'syncMetadatas');
        try {
            if (metaData.module) {
                const moduleUpdated = await this.modulesService.upSert(
                    { name: metaData.module },
                    { name: metaData.module, status: 1, deleted: 0 },
                );
                if (moduleUpdated && metaData.resource) {
                    const resource = await this.resourcesService.upSert(
                        { name: metaData.resource, moduleId: moduleUpdated.id },
                        {
                            name: metaData.resource,
                            status: 1,
                            deleted: 0,
                            moduleId: moduleUpdated.id,
                        },
                    );
                    if (resource && metaData.actions) {
                        for (const action of metaData.actions) {
                            this.actionsService.upSert(
                                { name: action, resourceId: resource.id },
                                { name: action, status: 1, deleted: 0, resourceId: resource.id },
                            );
                        }
                    }
                }
            }
            return true;
        } catch (error) {
            Logger.error(error.message || error.text, null, SettingsService.name);
            return false;
        }
    }
}
