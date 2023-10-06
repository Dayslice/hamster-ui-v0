import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToRun1696599092769 implements MigrationInterface {
    name = 'AddStatusToRun1696599092769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "run" ADD "status" character varying NOT NULL DEFAULT 'done'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "run" DROP COLUMN "status"`);
    }

}
