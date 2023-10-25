import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtToTables1698241840508 implements MigrationInterface {
  name = 'AddDeletedAtToTables1698241840508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "step_tool" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "run" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "run" ADD "cancelled_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "run" ADD "initial_input" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "run" ADD "output" jsonb`);
    await queryRunner.query(`ALTER TABLE "run" ALTER COLUMN "status" SET DEFAULT 'queued'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "run" ALTER COLUMN "status" SET DEFAULT 'done'`);
    await queryRunner.query(`ALTER TABLE "run" DROP COLUMN "output"`);
    await queryRunner.query(`ALTER TABLE "run" DROP COLUMN "initial_input"`);
    await queryRunner.query(`ALTER TABLE "run" DROP COLUMN "cancelled_at"`);
    await queryRunner.query(`ALTER TABLE "run" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "step_tool" DROP COLUMN "deleted_at"`);
  }
}
