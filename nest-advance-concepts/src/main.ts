import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_CONFIG_KEY, AppConfig } from './config/app.config';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: 'http://localhost:5173' });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    const config = app.get(ConfigService);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Nest Advance Concepts API')
        .setDescription('The Nest Advance Concepts API description')
        .setVersion('0.1')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    const port = config.get<AppConfig>(APP_CONFIG_KEY)?.port ?? 3000;

    await app.listen(port);
}
void bootstrap();
