import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { MyHttpService } from './services/http.service';
import { ActionsSchema } from './services/schemas/actions.schema';
import { ModulesSchema } from './services/schemas/modules.schema';
import { RequestForgotPasswordsSchema } from './services/schemas/request-forgot-password.schema';
import { ResourcesSchema } from './services/schemas/resources.schema';
import { AclsSchema, RolesSchema } from './services/schemas/roles.schema';
import { SettingsSchema } from './services/schemas/settings.schema';
import { UserActivitiesSchema } from './services/schemas/user-activities.schema';
import { UserTokensSchema } from './services/schemas/user-tokens.schema';
import { UsersSchema } from './services/schemas/users.schema';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
    imports: [
        ScheduleModule.forRoot(),
        JwtModule.register({
            secret: process.env.APP_SECRET || 'bQeThWmZq4t7w9z',
            signOptions: {
                expiresIn: '24h',
            },
        }),
        MongooseModule.forFeature([
            { name: 'Users', schema: UsersSchema },
            { name: 'UserTokens', schema: UserTokensSchema },
            { name: 'UserActivities', schema: UserActivitiesSchema },
            { name: 'Roles', schema: RolesSchema },
            { name: 'Acls', schema: AclsSchema },
            { name: 'RequestForgotPasswords', schema: RequestForgotPasswordsSchema },

            { name: 'Settings', schema: SettingsSchema },
            { name: 'Resources', schema: ResourcesSchema },
            { name: 'Modules', schema: ModulesSchema },
            { name: 'Actions', schema: ActionsSchema },
        ]),
    ],
    providers: [
        MyHttpService
    ],
    exports: [MyHttpService, JwtModule, MongooseModule],
})
export class SharedModule { }
