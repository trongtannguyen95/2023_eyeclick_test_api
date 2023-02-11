import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { SystemsModule } from '../systems/system.module';
import { AuthController } from './controllers/auth.controller';
import { RolesController } from './controllers/roles.controller';
import { UserActivitiesController } from './controllers/user-activities.controller';
import { UserTokensController } from './controllers/user-tokens.controller';
import { UsersController } from './controllers/users.controller';
import { AclsService } from './services/acls.service';
import { RequestForgotPasswordsService } from './services/request-forgot-passwords.service';
import { RolesService } from './services/roles.service';
import { SendMailProcessor } from './services/send-mail.processor';
import { UserActivitiesService } from './services/user-activities.service';
import { UserTokensService } from './services/user-tokens.service';
import { UsersService } from './services/users.service';

@Module({
    imports: [
        SharedModule,
        forwardRef(() => SystemsModule),
    ],
    controllers: [AuthController, UserTokensController, UsersController, RolesController, UserActivitiesController],
    providers: [
        UsersService,
        UserTokensService,
        UserActivitiesService,
        RolesService,
        AclsService,
        RequestForgotPasswordsService,
        SendMailProcessor,
    ],
    exports: [UsersService, UserTokensService, UserActivitiesService, RolesService],
})
export class UsersModule {}
