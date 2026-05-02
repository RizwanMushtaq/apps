import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './common/database/database.module';

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
    providers: [],
})
export class AppModule {}
