import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports:[
    AuthModule
  ]
})
export class TagModule {}
