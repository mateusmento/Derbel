import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationCreateUser1689630335119 implements MigrationInterface {
  name = 'MigrationCreateUser1689630335119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "name" character varying NOT NULL,
                "credentialId" integer,
                CONSTRAINT "REL_d6d50143a16c49c49bf467ae54" UNIQUE ("credentialId"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_d6d50143a16c49c49bf467ae541" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_d6d50143a16c49c49bf467ae541"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
