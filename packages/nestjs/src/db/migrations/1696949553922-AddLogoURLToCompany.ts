import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLogoURLToCompany1696949553922 implements MigrationInterface {
  name = 'AddLogoURLToCompany1696949553922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company" ADD "logo_url" character varying NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "logo_url"`);
  }
}
