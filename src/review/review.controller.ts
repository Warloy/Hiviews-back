import { Controller, Post, Body, Get, Param, Delete, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Auth } from 'src/auth/decorators';
import { GetUser } from 'src/auth/decorators/get-user.decorator'; // Importa el decorador para obtener el usuario autenticado
import { User } from 'src/auth/entities/user.entity';
import { ParseMongoIdPipe } from 'src/common/dto/pipes/parse-mongo-id.pipe';
import { UpdateReviewDto } from './dto/update-review.dto';

@Auth()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(@GetUser() user:User, @Body() createReviewDto: CreateReviewDto) {
    // Aquí asumimos que tienes un decorador @GetUser() que obtiene el usuario autenticado
    const userId = user; // Obtén el userId del usuario autenticado
    return await this.reviewService.create(userId, createReviewDto);
  }
  @Get()
  async findAllReviews() {
    return await this.reviewService.findAllReviews();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.reviewService.findOne(term);
  }

  @Get('match/:term') // New route for partial match
  async findAllMatch(@Param('term') term: string) {
    return this.reviewService.findAllMatch(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.updateReview( term, updateReviewDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.reviewService.remove(id);
  }
 
  


}

