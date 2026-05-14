import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './common/database/database.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseLoggingInterceptor } from './common/interceptors/response-logging.interceptor';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [appConfig],
        }),
        UsersModule,
        DatabaseModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseLoggingInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: PrismaExceptionFilter,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*'); // Apply for all routes
    }
}
