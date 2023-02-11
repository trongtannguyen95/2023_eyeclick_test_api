import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import CookieParser from 'cookie-parser';
import express from 'express';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
// import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { getResourceActionsMetaData } from './modules/users/helpers/auth.helper';
import { buildSwagger } from './swagger';
import * as dotenv from 'dotenv';

export let app: NestExpressApplication;

async function bootstrap() {
    dotenv.config();

    app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: ['debug', 'warn'] });

    app.enableCors({
        optionsSuccessStatus: 200,
        preflightContinue: false,
        credentials: true,
        exposedHeaders: ['Retry-After'],
    });

    // if (process.env.isDev) {
    //     buildSwagger(app);
    // }
    buildSwagger(app);

    const prefix = process.env.APP_PREFIX ? `/${process.env.APP_PREFIX}` : '';
    app.useStaticAssets(resolve('./public'), { prefix: prefix + '/public' });
    app.useStaticAssets(resolve('./media'), { prefix: prefix + '/media' });

    app.use(express.json({ limit: '30mb' }));
    app.use(express.urlencoded({ limit: '30mb', extended: true }));
    app.use(CookieParser());

    // fetch metadata
    getResourceActionsMetaData();

    // set config app
    app.setGlobalPrefix(process.env.APP_PREFIX);
    app.set('trust proxy', true);

    // register pipes
    app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { excludeExtraneousValues: true } }));

    // register interceptors
    // app.useGlobalInterceptors(new LoggingInterceptor());

    // register Filter
    app.useGlobalFilters(new NotFoundExceptionFilter());

    app.enableShutdownHooks();

    await app.startAllMicroservices();
    // lauching app
    await app.listen(parseInt(process.env.APP_PORT));
    Logger.debug(`${process.env.APP_NAME} runing on ${process.env.APP_URL}`);
    Logger.debug(`${process.env.APP_NAME} listen on ${process.env.APP_PORT}`);
}
bootstrap();
