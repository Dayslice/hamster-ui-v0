import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderToSteps1696448126303 implements MigrationInterface {
    name = 'AddOrderToSteps1696448126303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" ADD "order" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "log" ALTER COLUMN "type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ALTER COLUMN "type" SET DEFAULT 'output'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "log" ALTER COLUMN "type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "step" DROP COLUMN "order"`);
    }

}
