import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationCreateMeetingAndMeetingAttendee1689953700487 implements MigrationInterface {
    name = 'MigrationCreateMeetingAndMeetingAttendee1689953700487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "meetings" (
                "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "ongoing" boolean NOT NULL,
                "contactId" integer NOT NULL,
                CONSTRAINT "REL_6a2636674f208b3982e1513890" UNIQUE ("contactId"),
                CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "meeting_attendees" (
                "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                "remoteId" character varying NOT NULL,
                "userId" integer NOT NULL,
                "meetingId" integer,
                CONSTRAINT "PK_b49884a61337dbfb2f3018710da" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "meetings"
            ADD CONSTRAINT "FK_6a2636674f208b3982e15138903" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "meeting_attendees"
            ADD CONSTRAINT "FK_b86573f82432120ef02a6c54655" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "meeting_attendees"
            ADD CONSTRAINT "FK_9a43754fb3b554f3968e209e7b6" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "meeting_attendees" DROP CONSTRAINT "FK_9a43754fb3b554f3968e209e7b6"
        `);
        await queryRunner.query(`
            ALTER TABLE "meeting_attendees" DROP CONSTRAINT "FK_b86573f82432120ef02a6c54655"
        `);
        await queryRunner.query(`
            ALTER TABLE "meetings" DROP CONSTRAINT "FK_6a2636674f208b3982e15138903"
        `);
        await queryRunner.query(`
            DROP TABLE "meeting_attendees"
        `);
        await queryRunner.query(`
            DROP TABLE "meetings"
        `);
    }

}
