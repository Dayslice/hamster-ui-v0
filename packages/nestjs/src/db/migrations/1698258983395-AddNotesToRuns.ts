import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotesToRuns1698258983395 implements MigrationInterface {
  name = 'AddNotesToRuns1698258983395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "run" ADD "notes" character varying NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "run" DROP COLUMN "notes"`);
  }
}
