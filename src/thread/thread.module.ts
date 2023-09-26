import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ThreadController],
  providers: [ThreadService],
  imports: [
    AuthModule
  ]
})
export class ThreadModule {}
