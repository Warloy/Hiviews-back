import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    AuthModule
  ]
})
export class CommentModule {}
