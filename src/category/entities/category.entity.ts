import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Thread } from 'src/thread/entities/thread.entity';

@Schema()
export class Category extends Document {
  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  name: string;

  // Add any other properties relevant to your Category entity

  @Prop({type: [{type: Types.ObjectId, ref: 'Thread.name' , required: true}] })
    reviews: Types.Array<Thread>;

}

export const CategorySchema = SchemaFactory.createForClass(Category);