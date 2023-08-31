import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { createRedisSocketIoAdapter } from './socket.io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: config.get('CORS_ORIGINS'),
    credentials: true,
  });
  app.use(cookieParser(config.get('COOKIE_SECRET')));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const adapter = await createRedisSocketIoAdapter(app, config);
  app.useWebSocketAdapter(adapter);
  await app.listen(config.get('APP_PORT'));
}

bootstrap();
