import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationAddCreatedAtToContact1691149125882 implements MigrationInterface {
    name = 'MigrationAddCreatedAtToContact1691149125882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "contacts"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "contacts" DROP COLUMN "createdAt"
        `);
    }

}
