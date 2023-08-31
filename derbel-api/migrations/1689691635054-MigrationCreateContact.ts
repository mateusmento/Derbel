import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationCreateContact1689691635054 implements MigrationInterface {
  name = 'MigrationCreateContact1689691635054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "contacts" (
                "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "contact_peers" (
                "contactsId" integer NOT NULL,
                "usersId" integer NOT NULL,
                CONSTRAINT "PK_89b765eb1baffdbda39840eabeb" PRIMARY KEY ("contactsId", "usersId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_32f559db3b9ccdfa3d78abeda5" ON "contact_peers" ("contactsId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_31926f744f66b6f7343100255f" ON "contact_peers" ("usersId")
        `);
    await queryRunner.query(`
            ALTER TABLE "contact_peers"
            ADD CONSTRAINT "FK_32f559db3b9ccdfa3d78abeda56" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "contact_peers"
            ADD CONSTRAINT "FK_31926f744f66b6f7343100255fb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "contact_peers" DROP CONSTRAINT "FK_31926f744f66b6f7343100255fb"
        `);
    await queryRunner.query(`
            ALTER TABLE "contact_peers" DROP CONSTRAINT "FK_32f559db3b9ccdfa3d78abeda56"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_31926f744f66b6f7343100255f"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_32f559db3b9ccdfa3d78abeda5"
        `);
    await queryRunner.query(`
            DROP TABLE "contact_peers"
        `);
    await queryRunner.query(`
            DROP TABLE "contacts"
        `);
  }
}
