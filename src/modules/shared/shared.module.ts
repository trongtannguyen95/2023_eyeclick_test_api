import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { ScheduleModule } from '@nestjs/schedule';
import { MyHttpService } from './services/http.service';
import { RequestForgotPasswordsSchema } from './services/schemas/request-forgot-password.schema';
import { UserActivitiesSchema } from './services/schemas/user-activities.schema';
import { UserTokensSchema } from './services/schemas/user-tokens.schema';
import { UsersSchema } from './services/schemas/users.schema';
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
            { name: 'RequestForgotPasswords', schema: RequestForgotPasswordsSchema },
        ]),
    ],
    providers: [
        MyHttpService
    ],
    exports: [MyHttpService, JwtModule, MongooseModule],
})
export class SharedModule { }
