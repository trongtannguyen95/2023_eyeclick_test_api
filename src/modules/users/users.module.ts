import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './controllers/auth.controller';
import { UserTokensController } from './controllers/user-tokens.controller';
import { UsersController } from './controllers/users.controller';
import { RequestForgotPasswordsService } from './services/request-forgot-passwords.service';
import { SendMailProcessor } from './services/send-mail.processor';
import { UserActivitiesService } from './services/user-activities.service';
import { UserTokensService } from './services/user-tokens.service';
import { UsersService } from './services/users.service';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [AuthController, UserTokensController, UsersController],
    providers: [
        UsersService,
        UserTokensService,
        RequestForgotPasswordsService,
        UserActivitiesService,
        SendMailProcessor,
    ],
    exports: [UsersService, UserTokensService, UserActivitiesService],
})
export class UsersModule { }
