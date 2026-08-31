import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumn1787948143487 implements MigrationInterface {
    name = 'AddColumn1787948143487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "telefono" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT 'valor_por_defecto'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "telefono"`);
    }

}
