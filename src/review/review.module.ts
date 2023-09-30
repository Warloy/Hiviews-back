import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
        name: Review.name,
        schema: ReviewSchema
      }]),
    AuthModule
  ],
  exports: [
    MongooseModule,
  ]
})
export class ReviewModule {}
