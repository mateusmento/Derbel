import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationCreateMessage1689718265438 implements MigrationInterface {
    name = 'MigrationCreateMessage1689718265438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "text" character varying NOT NULL,
                "sentAt" TIMESTAMP NOT NULL DEFAULT now(),
                "speakerId" integer NOT NULL,
                "contactId" integer NOT NULL,
                CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_e25315b446caa9f6b3fae3ff66d" FOREIGN KEY ("speakerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_435f12bd11014722a707a292763" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_435f12bd11014722a707a292763"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_e25315b446caa9f6b3fae3ff66d"
        `);
        await queryRunner.query(`
            DROP TABLE "messages"
        `);
    }

}
