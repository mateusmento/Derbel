import { Expose, plainToClass } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, validateSync } from 'class-validator';

export class AppConfig {
  @Expose()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @Expose()
  @IsNotEmpty()
  DATABASE_PORT: string;

  @Expose()
  @IsNumber()
  PASSWORD_ROUNDS: number;

  @Expose()
  @IsNotEmpty()
  COOKIE_SECRET: string;

  @Expose()
  @IsNotEmpty()
  JWT_SECRET: string;

  @Expose()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;

  @Expose()
  @IsArray()
  CORS_ORIGINS: string[];

  static create(env: Record<string, any>): AppConfig {
    env.CORS_ORIGINS = (env.CORS_ORIGINS ?? '')
      .split(',')
      .map((org) => org.trim());
    const config = plainToClass(AppConfig, env, {
      enableImplicitConversion: true,
      strategy: 'excludeAll',
    });
    const errors = validateSync(config);
    if (errors.length > 0) throw new Error(errors.toString());
    return config;
  }
}
