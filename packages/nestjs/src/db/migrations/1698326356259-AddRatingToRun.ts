import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRatingToRun1698326356259 implements MigrationInterface {
  name = 'AddRatingToRun1698326356259';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "run" ADD "rating" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "run" DROP COLUMN "rating"`);
  }
}
