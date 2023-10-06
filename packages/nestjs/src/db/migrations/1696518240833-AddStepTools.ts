import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStepTools1696518240833 implements MigrationInterface {
    name = 'AddStepTools1696518240833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "step_tool" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tool_id" uuid NOT NULL, "step_id" uuid NOT NULL, "config" jsonb NOT NULL, "order" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a4945ad08a12f146641a47ffbe4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "step_tool_inputs" ("step_tool_id" uuid NOT NULL, "step_tool_input_id" uuid NOT NULL, CONSTRAINT "PK_9fe7e1a0141ded4cb0a52c2e20f" PRIMARY KEY ("step_tool_id", "step_tool_input_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c5c5fb11cad7feebf6d929443" ON "step_tool_inputs" ("step_tool_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d9c255001e727f690ce2597503" ON "step_tool_inputs" ("step_tool_input_id") `);
        await queryRunner.query(`ALTER TABLE "tool" ADD "output_model" jsonb`);
        await queryRunner.query(`ALTER TABLE "step_tool" ADD CONSTRAINT "FK_97549fc52a6968787ad1aba59d2" FOREIGN KEY ("step_id") REFERENCES "step"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "step_tool" ADD CONSTRAINT "FK_5e03f6202cb614047a3889019a7" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "step_tool_inputs" ADD CONSTRAINT "FK_0c5c5fb11cad7feebf6d9294437" FOREIGN KEY ("step_tool_id") REFERENCES "step_tool"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "step_tool_inputs" ADD CONSTRAINT "FK_d9c255001e727f690ce25975035" FOREIGN KEY ("step_tool_input_id") REFERENCES "step_tool"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step_tool_inputs" DROP CONSTRAINT "FK_d9c255001e727f690ce25975035"`);
        await queryRunner.query(`ALTER TABLE "step_tool_inputs" DROP CONSTRAINT "FK_0c5c5fb11cad7feebf6d9294437"`);
        await queryRunner.query(`ALTER TABLE "step_tool" DROP CONSTRAINT "FK_5e03f6202cb614047a3889019a7"`);
        await queryRunner.query(`ALTER TABLE "step_tool" DROP CONSTRAINT "FK_97549fc52a6968787ad1aba59d2"`);
        await queryRunner.query(`ALTER TABLE "tool" DROP COLUMN "output_model"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d9c255001e727f690ce2597503"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c5c5fb11cad7feebf6d929443"`);
        await queryRunner.query(`DROP TABLE "step_tool_inputs"`);
        await queryRunner.query(`DROP TABLE "step_tool"`);
    }

}
