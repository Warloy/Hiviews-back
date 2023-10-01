import { Controller, Get } from '@nestjs/common';

@Controller('connected')
export class AppController {
  @Get()
  checkConnection() {
    return { status: 'Backend is running' };
  }
}