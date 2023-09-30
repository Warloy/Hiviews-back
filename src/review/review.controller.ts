import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Auth } from 'src/auth/decorators';
import { GetUser } from 'src/auth/decorators/get-user.decorator'; // Importa el decorador para obtener el usuario autenticado
import { User } from 'src/auth/entities/user.entity';

@Auth()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@GetUser() user:User, @Body() createReviewDto: CreateReviewDto) {
    // Aquí asumimos que tienes un decorador @GetUser() que obtiene el usuario autenticado
    const userId = user.id; // Obtén el userId del usuario autenticado

    return await this.reviewService.create(userId, createReviewDto);
  }
}

