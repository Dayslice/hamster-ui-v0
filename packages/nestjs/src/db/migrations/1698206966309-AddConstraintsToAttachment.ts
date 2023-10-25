import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConstraintsToAttachment1698206966309 implements MigrationInterface {
  name = 'AddConstraintsToAttachment1698206966309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_244b263830f084a8e2c79513723"`);
    await queryRunner.query(
      `ALTER TABLE "attachment" ADD CONSTRAINT "FK_244b263830f084a8e2c79513723" FOREIGN KEY ("log_id") REFERENCES "log"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_244b263830f084a8e2c79513723"`);
    await queryRunner.query(
      `ALTER TABLE "attachment" ADD CONSTRAINT "FK_244b263830f084a8e2c79513723" FOREIGN KEY ("log_id") REFERENCES "log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
