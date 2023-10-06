import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskToWorkflow1696533905497 implements MigrationInterface {
    name = 'AddTaskToWorkflow1696533905497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow" ADD "task" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow" DROP COLUMN "task"`);
    }

}
