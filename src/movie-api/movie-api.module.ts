import { Module } from '@nestjs/common';
import { MovieApiService } from './movie-api.service';
import { MovieApiController } from './movie-api.controller';

@Module({
  controllers: [MovieApiController],
  providers: [MovieApiService],
})
export class MovieApiModule {}
