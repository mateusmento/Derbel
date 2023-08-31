import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormDataSourceOptions } from 'src/typeorm.config';
import { DataSource } from 'typeorm';
import { AppConfig } from './app.config';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { MeetingModule } from './meeting/meeting.module';
import { MessagingModule } from './messaging/messaging.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: AppConfig.create,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormDataSourceOptions,
      dataSourceFactory: async (options) => new DataSource(options),
    }),
    AuthModule,
    ContactModule,
    MessagingModule,
    MeetingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
