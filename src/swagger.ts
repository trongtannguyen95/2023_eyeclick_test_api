import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function buildSwagger(app: NestExpressApplication) {
    const options = new DocumentBuilder()
        .setTitle(process.env.APP_NAME)
        .setDescription(process.env.APP_DESCRIPTION)
        .setVersion(process.env.APP_API_VERSION)
        .addServer(process.env.APP_URL)
        .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authorization' })
        .build();

    const documentPubic = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(process.env.APP_API_DOCS_PATH, app, documentPubic, {
        customSiteTitle: process.env.APP_NAME,
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
            redirect: false,
        },
    });
}
