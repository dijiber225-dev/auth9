import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba21787083303045 implements MigrationInterface {
    name = 'Prueba21787083303045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "prueba" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "prueba"`);
    }

}
