import { Module, forwardRef } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { ResourcesService } from './services/resources.service';
import { ModulesService } from './services/modules.service';
import { ActionsService } from './services/actions.service';
import { UsersModule } from '../users/users.module';
import { ActionController } from './controllers/actions.controller';
import { ModuleController } from './controllers/modules.controller';
import { ResourceController } from './controllers/resoucrces.controller';
import { UploadsController } from './controllers/uploads.controller';

@Module({
    imports: [SharedModule, forwardRef(() => UsersModule)],
    controllers: [SettingsController, ActionController, ModuleController, ResourceController, UploadsController],
    providers: [SettingsService, ModulesService, ResourcesService, ActionsService],
    exports: [ActionsService],
})
export class SystemsModule {}
