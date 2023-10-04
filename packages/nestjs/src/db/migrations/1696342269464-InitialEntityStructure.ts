import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialEntityStructure1696342269464 implements MigrationInterface {
  name = 'InitialEntityStructure1696342269464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tool" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "description" character varying NOT NULL, "api_token" character varying NOT NULL DEFAULT '', "ref" character varying NOT NULL, "config" jsonb, CONSTRAINT "UQ_91a877c28a905b2d67ff97d3906" UNIQUE ("ref"), CONSTRAINT "PK_3bf5b1016a384916073184f99b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "style" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "description" character varying NOT NULL, "example" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_12a3ba7fe23b5386181ac6b0ac0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workflow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_eb5e4cc1a9ef2e94805b676751b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "step" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "description" character varying NOT NULL, "primary_agent_id" uuid NOT NULL, "workflow_id" uuid NOT NULL, CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "agent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "expertise" text array NOT NULL, "title" character varying NOT NULL, "avatar_url" character varying NOT NULL, "background_short" character varying, "background_long" character varying, "style_id" uuid, CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "google_id" character varying NOT NULL, "picture_url" character varying NOT NULL, "company_id" uuid NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_7adac5c0b28492eb292d4a93871" UNIQUE ("google_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "business_goals" character varying NOT NULL, "metadata" jsonb NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "elevator_pitch" character varying NOT NULL, "communication_style_id" uuid NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "run" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "workflow_id" uuid NOT NULL, "company_id" uuid NOT NULL, "version" integer NOT NULL, CONSTRAINT "PK_804c38ffba92002c6d2c646dd46" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."log_type_enum" AS ENUM('output', 'chat', 'task', 'tool')`);
    await queryRunner.query(
      `CREATE TABLE "log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."log_type_enum" NOT NULL DEFAULT 'output', "content" character varying NOT NULL, "run_id" uuid NOT NULL, "source_agent_id" uuid, "target_agent_id" uuid, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying NOT NULL, "url" character varying NOT NULL, "revision" integer NOT NULL, "log_id" uuid NOT NULL, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "step_other_agents" ("step_id" uuid NOT NULL, "agent_id" uuid NOT NULL, CONSTRAINT "PK_65a43b00e6bbbdd56228c8fb7c4" PRIMARY KEY ("step_id", "agent_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_eb2ec3d2279bef3f13af584c65" ON "step_other_agents" ("step_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_5f46d14a6d3a570d93a4fffd70" ON "step_other_agents" ("agent_id") `);
    await queryRunner.query(
      `CREATE TABLE "agent_tools" ("agent_id" uuid NOT NULL, "tool_id" uuid NOT NULL, CONSTRAINT "PK_e8d4875844d8db55922c4cc5308" PRIMARY KEY ("agent_id", "tool_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_6cd8d0d6927bc95c8767e44eb7" ON "agent_tools" ("agent_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_5f5ed36361643858d499d142ad" ON "agent_tools" ("tool_id") `);
    await queryRunner.query(
      `ALTER TABLE "step" ADD CONSTRAINT "FK_508d1fc0d631ecd9674503ff47e" FOREIGN KEY ("primary_agent_id") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "step" ADD CONSTRAINT "FK_5d0d7084424f806cd7749db6509" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "agent" ADD CONSTRAINT "FK_7a5bb51c8f5b729b2facd6c073a" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_f56616262d47e8bf9136efd10b4" FOREIGN KEY ("communication_style_id") REFERENCES "style"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "run" ADD CONSTRAINT "FK_ad8fe16bf3886bbac3cd72ef63a" FOREIGN KEY ("workflow_id") REFERENCES "workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "run" ADD CONSTRAINT "FK_c47fefe187d7b175b124642fe4b" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "log" ADD CONSTRAINT "FK_a29bc3b697c897da9dfda66c769" FOREIGN KEY ("run_id") REFERENCES "run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "log" ADD CONSTRAINT "FK_a5833d8c51541d9d57f92da08fd" FOREIGN KEY ("source_agent_id") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "log" ADD CONSTRAINT "FK_8f9f189eecf58540efd1882c7c8" FOREIGN KEY ("target_agent_id") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachment" ADD CONSTRAINT "FK_244b263830f084a8e2c79513723" FOREIGN KEY ("log_id") REFERENCES "log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "step_other_agents" ADD CONSTRAINT "FK_eb2ec3d2279bef3f13af584c654" FOREIGN KEY ("step_id") REFERENCES "step"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "step_other_agents" ADD CONSTRAINT "FK_5f46d14a6d3a570d93a4fffd70a" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "agent_tools" ADD CONSTRAINT "FK_6cd8d0d6927bc95c8767e44eb79" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "agent_tools" ADD CONSTRAINT "FK_5f5ed36361643858d499d142adb" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "agent_tools" DROP CONSTRAINT "FK_5f5ed36361643858d499d142adb"`);
    await queryRunner.query(`ALTER TABLE "agent_tools" DROP CONSTRAINT "FK_6cd8d0d6927bc95c8767e44eb79"`);
    await queryRunner.query(`ALTER TABLE "step_other_agents" DROP CONSTRAINT "FK_5f46d14a6d3a570d93a4fffd70a"`);
    await queryRunner.query(`ALTER TABLE "step_other_agents" DROP CONSTRAINT "FK_eb2ec3d2279bef3f13af584c654"`);
    await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_244b263830f084a8e2c79513723"`);
    await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_8f9f189eecf58540efd1882c7c8"`);
    await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_a5833d8c51541d9d57f92da08fd"`);
    await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_a29bc3b697c897da9dfda66c769"`);
    await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_c47fefe187d7b175b124642fe4b"`);
    await queryRunner.query(`ALTER TABLE "run" DROP CONSTRAINT "FK_ad8fe16bf3886bbac3cd72ef63a"`);
    await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_f56616262d47e8bf9136efd10b4"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"`);
    await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_7a5bb51c8f5b729b2facd6c073a"`);
    await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_5d0d7084424f806cd7749db6509"`);
    await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_508d1fc0d631ecd9674503ff47e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5f5ed36361643858d499d142ad"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6cd8d0d6927bc95c8767e44eb7"`);
    await queryRunner.query(`DROP TABLE "agent_tools"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5f46d14a6d3a570d93a4fffd70"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_eb2ec3d2279bef3f13af584c65"`);
    await queryRunner.query(`DROP TABLE "step_other_agents"`);
    await queryRunner.query(`DROP TABLE "attachment"`);
    await queryRunner.query(`DROP TABLE "log"`);
    await queryRunner.query(`DROP TYPE "public"."log_type_enum"`);
    await queryRunner.query(`DROP TABLE "run"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "agent"`);
    await queryRunner.query(`DROP TABLE "step"`);
    await queryRunner.query(`DROP TABLE "workflow"`);
    await queryRunner.query(`DROP TABLE "style"`);
    await queryRunner.query(`DROP TABLE "tool"`);
  }
}
