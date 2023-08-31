import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationAddLastMessageToContact1691094348654
  implements MigrationInterface
{
  name = 'MigrationAddLastMessageToContact1691094348654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "contacts"
            ADD "lastMessageId" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "meeting_attendees" DROP CONSTRAINT "FK_9a43754fb3b554f3968e209e7b6"
        `);
    await queryRunner.query(`
            ALTER TABLE "meeting_attendees"
            ALTER COLUMN "meetingId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "meeting_attendees"
            ADD CONSTRAINT "FK_9a43754fb3b554f3968e209e7b6" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "contacts"
            ADD CONSTRAINT "FK_4147652f730c7873f7ddd503f40" FOREIGN KEY ("lastMessageId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "contacts" DROP CONSTRAINT "FK_4147652f730c7873f7ddd503f40"
        `);
    await queryRunner.query(`
            ALTER TABLE "meeting_attendees" DROP CONSTRAINT "FK_9a43754fb3b554f3968e209e7b6"
        `);
    await queryRunner.query(`
            ALTER TABLE "meeting_attendees"
            ALTER COLUMN "meetingId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "meeting_attendees"
            ADD CONSTRAINT "FK_9a43754fb3b554f3968e209e7b6" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "contacts" DROP COLUMN "lastMessageId"
        `);
  }
}
