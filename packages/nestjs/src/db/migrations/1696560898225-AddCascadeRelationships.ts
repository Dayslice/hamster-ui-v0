import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeRelationships1696560898225 implements MigrationInterface {
    name = 'AddCascadeRelationships1696560898225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_5d0d7084424f806cd7749db6509"`);
        await queryRunner.query(`ALTER TABLE "step_tool" DROP CONSTRAINT "FK_97549fc52a6968787ad1aba59d2"`);
        await queryRunner.query(`ALTER TABLE "step_tool" DROP CONSTRAINT "FK_5e03f6202cb614047a3889019a7"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_ad8fe16bf3886bbac3cd72ef63a"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_c47fefe187d7b175b124642fe4b"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_a29bc3b697c897da9dfda66c769"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_a5833d8c51541d9d57f92da08fd"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_8f9f189eecf58540efd1882c7c8"`);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_5d0d7084424f806cd7749db6509" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "step_tool" ADD CONSTRAINT "FK_97549fc52a6968787ad1aba59d2" FOREIGN KEY ("step_id") REFERENCES "step"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "step_tool" ADD CONSTRAINT "FK_5e03f6202cb614047a3889019a7" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_ad8fe16bf3886bbac3cd72ef63a" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_c47fefe187d7b175b124642fe4b" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_a29bc3b697c897da9dfda66c769" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_a5833d8c51541d9d57f92da08fd" FOREIGN KEY ("source_agent_id") REFERENCES "agent"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_8f9f189eecf58540efd1882c7c8" FOREIGN KEY ("target_agent_id") REFERENCES "agent"("id") ON DELETE SET NULL ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_8f9f189eecf58540efd1882c7c8"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_a5833d8c51541d9d57f92da08fd"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_a29bc3b697c897da9dfda66c769"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_c47fefe187d7b175b124642fe4b"`);
        await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_ad8fe16bf3886bbac3cd72ef63a"`);
        await queryRunner.query(`ALTER TABLE "step_tool" DROP CONSTRAINT "FK_5e03f6202cb614047a3889019a7"`);
        await queryRunner.query(`ALTER TABLE "step_tool" DROP CONSTRAINT "FK_97549fc52a6968787ad1aba59d2"`);
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_5d0d7084424f806cd7749db6509"`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_8f9f189eecf58540efd1882c7c8" FOREIGN KEY ("target_agent_id") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_a5833d8c51541d9d57f92da08fd" FOREIGN KEY ("source_agent_id") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_a29bc3b697c897da9dfda66c769" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_c47fefe187d7b175b124642fe4b" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "run" ADD CONSTRAINT "FK_ad8fe16bf3886bbac3cd72ef63a" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "step_tool" ADD CONSTRAINT "FK_5e03f6202cb614047a3889019a7" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "step_tool" ADD CONSTRAINT "FK_97549fc52a6968787ad1aba59d2" FOREIGN KEY ("step_id") REFERENCES "step"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_5d0d7084424f806cd7749db6509" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
