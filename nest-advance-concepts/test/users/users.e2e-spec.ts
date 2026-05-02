import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '@app/src/app.module';
import { UsersModule } from '@app/src/users/users.module';
import { DatabaseModule } from '@app/src/common/database/database.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, UsersModule, DatabaseModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/users (GET)', () => {
        return request(app.getHttpServer()).get('/users').expect(200);
    });

    afterEach(async () => {
        await app.close();
    });
});
