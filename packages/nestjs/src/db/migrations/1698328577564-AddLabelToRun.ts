import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLabelToRun1698328577564 implements MigrationInterface {
  name = 'AddLabelToRun1698328577564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "run" ADD "label" character varying NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "run" DROP COLUMN "label"`);
  }
}
