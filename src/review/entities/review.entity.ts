import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Schema()
export class Review extends Document {
  @Prop()
  author: string;

  @Prop()
  description: string;

  @Prop()
  movie: string;

  @Prop()
  image: string;

  @Prop()
  date: Date;
  
  @Prop()
  rate: number;

  @Prop()
  likes: number;

  @Prop()
  comments: number;

  @Prop({ type: Types.ObjectId, ref: 'User.name' })
  user: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
