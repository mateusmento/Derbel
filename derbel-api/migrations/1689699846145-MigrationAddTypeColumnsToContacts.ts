import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationAddTypeColumnsToContacts1689699846145
  implements MigrationInterface
{
  name = 'MigrationAddTypeColumnsToContacts1689699846145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "contacts"
            ADD "type" character varying NOT NULL DEFAULT 'direct'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "contacts" DROP COLUMN "type"
        `);
  }
}
