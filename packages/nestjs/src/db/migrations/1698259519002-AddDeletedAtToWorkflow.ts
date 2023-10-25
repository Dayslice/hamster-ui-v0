import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtToWorkflow1698259519002 implements MigrationInterface {
  name = 'AddDeletedAtToWorkflow1698259519002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workflow" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workflow" DROP COLUMN "deleted_at"`);
  }
}
