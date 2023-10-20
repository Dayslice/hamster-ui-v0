import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSourceTable1697725528381 implements MigrationInterface {
  name = 'AddSourceTable1697725528381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "source" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "metadata" jsonb, "group_id" uuid, "embeddings" vector, "content" text, "slug" text, "contentUrl" text, "company_id" uuid NOT NULL, CONSTRAINT "PK_018c433f8264b58c86363eaadde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "source" ADD CONSTRAINT "FK_a1ca9b80fad21729c165354a517" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "source" DROP CONSTRAINT "FK_a1ca9b80fad21729c165354a517"`);
    await queryRunner.query(`DROP TABLE "source"`);
  }
}
