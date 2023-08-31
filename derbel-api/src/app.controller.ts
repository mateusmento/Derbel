import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private config: ConfigService) {}

  @Get()
  hello() {
    console.log('hello, world');
    return { port: this.config.get('APP_PORT') };
  }
}
