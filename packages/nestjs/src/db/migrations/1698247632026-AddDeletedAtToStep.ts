import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtToStep1698247632026 implements MigrationInterface {
  name = 'AddDeletedAtToStep1698247632026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "step" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "step" DROP COLUMN "deleted_at"`);
  }
}
