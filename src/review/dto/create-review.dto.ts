import { IsDateString, IsNumber, IsString, IsMongoId } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsString()
  movie: string;

  @IsString()
  image: string;

  @IsDateString()
  date: Date; // Cambiado a Date para reflejar un tipo de dato de fecha

  @IsNumber()
  rate: number;

  @IsNumber()
  likes: number;

  @IsNumber()
  comments: number;

  @IsMongoId() // Añade esta validación para representar el ID de usuario
  userId: string; // Cambiado a string para representar el ID del usuario
}
