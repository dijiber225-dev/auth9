import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnDefaultValue1787949117421 implements MigrationInterface {
    name = 'AddColumnDefaultValue1787949117421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "telefono" SET DEFAULT 'valor_por_defecto'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "telefono" DROP DEFAULT`);
    }

}
