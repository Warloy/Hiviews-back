import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../auth/entities/user.entity'; // Importa el modelo de usuario
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(user: User, createReviewDto: CreateReviewDto) {
    try {
      // Crear la reseña 
      const review = await this.reviewModel.create({
        ...createReviewDto,
        author: user.userName,  // Almacenar el nombre de usuario en la reseña
        authorId: user._id
      });
      

      // Obtener el usuario
      const userRecord = await this.userModel.findById(user._id);

      if (!userRecord) {
        throw new BadRequestException('User not found');
      }

      // Agregar la reseña al array de revisiones del usuario
      userRecord.reviews.push(review);

      // Guardar el usuario actualizado
      await userRecord.save();

      return {
        data: review,
        message: "message: 'Review created successfully.'"
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAllReviews() {
    try {
      const reviews = await this.reviewModel.find({ status: true }).populate('user', 'userName');
      return reviews;
    } catch (error) {
      this.handleExceptions(error);
    }
  }


  async findOne(term: string) {
    let review: Review;
  
    // Check if the term is a valid MongoID
    if (isValidObjectId(term)) {
      review = await this.reviewModel.findById(term);
    }
  
    // Check if the term is an author
    if (!review) {
      review = await this.reviewModel.findOne({ author: term.toLowerCase().trim() });
    }
  
    // Check if the term is a movie title (partial match)
    if (!review) {
      review = await this.reviewModel.findOne({
        movie: { $regex: new RegExp(term, 'i') }  // Case-insensitive partial match using regex
      });
    }
  
    // Throw NotFoundException if no review is found
    if (!review) {
      throw new NotFoundException(`Review with ID, author, or movie "${term}" not found`);
    }
  
    return review;
  }
  

  async findAllMatch(term: string) {
    let reviews: Review[];
  
    
    reviews = await this.reviewModel.find({
      movie: { $regex: new RegExp(`^${term}`, 'i') },
      status: true
    });
  

    if (!reviews || reviews.length === 0) {
      throw new NotFoundException(`No reviews found for movies starting with "${term}"`);
    }
  
    return reviews;
  }

   async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto) {
    try {
      const existingReview = await this.reviewModel.findById(reviewId);
  
      if (!existingReview) {
        throw new NotFoundException(`Review with ID "${reviewId}" not found`);
      }
  
      if (!existingReview.status) {
        throw new BadRequestException(`Review with ID "${reviewId}" is not active`);
      }
  
      // Update only the description
      const updatedReview = await this.reviewModel.findByIdAndUpdate(
        reviewId,
        { description: updateReviewDto.description.toLowerCase() },
        { new: true }
      );
  
      return {
        review: updatedReview,
        message: 'Review description updated successfully.',
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  


   async remove(reviewId: string) {
    try {
      const existingReview = await this.reviewModel.findById(reviewId);

      if (!existingReview) {
        throw new NotFoundException(`Review with ID "${reviewId}" not found`);
      }

      if (!existingReview.status) {
        throw new BadRequestException(`Review with ID "${reviewId}" is already inactive`);
      }

      // Actualizar el campo status a false
      existingReview.status = false;
      await existingReview.save();

      return { message: 'Review deactivated successfully' };
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