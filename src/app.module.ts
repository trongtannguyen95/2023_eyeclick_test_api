import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RouterModule, Routes, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { HttpMiddleware } from './middlewares/http.middleware';
import { BaseModule } from './modules/base/base.module';
import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { ShopModule } from './modules/shop/shop.module';
import { FrontendModule } from './modules/frontend/frontend.module';
const routes: Routes = [
    {
        path: '/app',
        children: [UsersModule, ShopModule,FrontendModule],
    },
];

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.local'],
        }),
        SharedModule,
        BaseModule,
        MongooseModule.forRoot(process.env.MONGODB_URL, {
            maxStalenessSeconds: 120,
            loggerLevel: 'debug',
            autoIndex: true,
        }),
        FrontendModule,
        UsersModule,
        ShopModule,
        RouterModule.register(routes),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 60,
        }),

    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
