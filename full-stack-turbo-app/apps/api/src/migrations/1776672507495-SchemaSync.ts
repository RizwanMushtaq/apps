import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1776672507495 implements MigrationInterface {
    name = 'SchemaSync1776672507495';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" RENAME COLUMN "title" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" RENAME COLUMN "name" TO "title"`);
    }
}
