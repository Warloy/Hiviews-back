import { Controller, Get, Param } from '@nestjs/common';
import { MovieApiService } from './movie-api.service';


@Controller('movie-api')
export class MovieApiController {
  constructor(private readonly movieApiService: MovieApiService) {}

  @Get('search/:term')
  searchMovie(@Param('term') term: string) {
    return this.movieApiService.movieSearch(term);
  }
  @Get('title/:title')
  movieByTitle(@Param('title') title: string) {
    return this.movieApiService.movieByTitle(title);
  }
}
