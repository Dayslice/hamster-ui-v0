import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStepToLog1696944163470 implements MigrationInterface {
    name = 'AddStepToLog1696944163470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" ADD "step_tool_id" uuid`);
        await queryRunner.query(`ALTER TABLE "log" ADD "step_id" uuid`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_16cd757a4e980779ca72edc7871" FOREIGN KEY ("step_tool_id") REFERENCES "step_tool"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_8a0b0ac636bf07256d7e05f474c" FOREIGN KEY ("step_id") REFERENCES "step"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_8a0b0ac636bf07256d7e05f474c"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_16cd757a4e980779ca72edc7871"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "step_id"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "step_tool_id"`);
    }

}
