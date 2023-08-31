import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { RedisAdapter, createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export async function createRedisSocketIoAdapter(
  app: INestApplication,
  config: ConfigService
) {
  const pub = createClient({ url: config.get('REDIS_URL') });
  const sub = pub.duplicate();
  await Promise.all([pub.connect(), sub.connect()]);
  return new SocketIoAdapter(app, createAdapter(pub, sub));
}

export class SocketIoAdapter extends IoAdapter {
  private config: ConfigService;
  private jwtService: JwtService;

  constructor(
    app: INestApplication,
    private adapter: (nsp: any) => RedisAdapter
  ) {
    super(app);
    this.config = app.get(ConfigService);
    this.jwtService = app.get(JwtService);
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: this.config.get('CORS_ORIGINS'),
        credentials: true,
      },
      allowRequest: async (req, decide) => {
        try {
          const user = await this.jwtService.verifyAsync(
            req.headers.authorization
          );
          (req as any).user = user;
          decide('', true);
        } catch (ex) {
          decide('Unauthorized', false);
        }
      },
    } as ServerOptions);
    server.adapter(this.adapter);
    return server;
  }
}
