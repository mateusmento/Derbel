import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenv } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { readdirSync } from 'fs';
import * as path from 'path';
import { CredentialEntity } from './auth/domain/credential.entity';
import { UserEntity } from './auth/domain/user.entity';
import { ContactEntity } from './contact/contact.entity';
import { MessageEntity } from './messaging/message.entity';
import { MeetingEntity, MeetingAttendeeEntity } from './meeting/meeting.entity';

dotenv();

const config = new ConfigService();

export const typeormDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.get('DATABASE_HOST'),
  port: config.get('DATABASE_PORT'),
  username: config.get('POSTGRES_USER'),
  password: config.get('POSTGRES_PASSWORD'),
  database: config.get('POSTGRES_DB'),
  logging: 'all',
  logger: 'advanced-console',
  entities: [
    CredentialEntity,
    UserEntity,
    ContactEntity,
    MessageEntity,
    MeetingEntity,
    MeetingAttendeeEntity,
  ],
  migrations: migrations(),
};

export default new DataSource({
  ...typeormDataSourceOptions,
  host: 'localhost',
});

function migrations(): any[] {
  const migrationsPath = path.resolve(__dirname, '..', 'migrations');
  const migrations = readdirSync(migrationsPath)
    .filter((filename) => /[0-9]*-Migration.*(?<!\.d)\.(ts|js)/.test(filename))
    .map((filename) => path.parse(filename).name)
    .map((filename) => require(`${migrationsPath}/${filename}`))
    .flatMap((module) => Object.values(module));
  return migrations;
}
