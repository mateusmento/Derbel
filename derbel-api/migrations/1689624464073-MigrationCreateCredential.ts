import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationCreateCredential1689624464073
  implements MigrationInterface
{
  name = 'MigrationCreateCredential1689624464073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "credentials" (
                "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_9696610f85145a37910365498f9" UNIQUE ("username"),
                CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "credentials"
        `);
  }
}
