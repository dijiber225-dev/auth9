import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba31787086714856 implements MigrationInterface {
    name = 'Prueba31787086714856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "prueba"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "prueba" character varying(255)`);
    }

}
