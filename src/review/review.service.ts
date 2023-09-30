import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../auth/entities/user.entity'; // Importa el modelo de usuario

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(userId: User, createReviewDto: CreateReviewDto) {
    try {
      // Crear la reseña
      const review = new this.reviewModel(createReviewDto);

      // Asignar el usuario a la reseña
      review.user = userId;

      // Guardar la revisión
      await review.save();

      // Obtener el usuario
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Agregar la revisión al array de revisiones del usuario
      user.reviews.push(review);

       
      // Guardar el usuario actualizado
      await user.save();

      return review
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Review already exists in the database: ${JSON.stringify(error.keyValue)}`);
    }

    console.log(error);
    throw new InternalServerErrorException(`Can't create review - Check server logs`);
  }
}
