import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Review } from "../../review/entities/review.entity";
//import { Thread } from "src/thread/entities/thread.entity";



@Schema()
export class User extends Document {

    @Prop({
        unique: true,
        required: true,
        index: true
    })
    email: string
    
    @Prop({
        unique: true,
        required: true,
        index: true
    })
    username: string
    @Prop({
        unique: true,
        required: true,
        index: true,
        select:false
    })
    password: string


    @Prop({
        required: true,
        index: true
    })
    name: string;
    
    @Prop({
        required: true,
        index: true
    })
    surname: string;

    @Prop({
        required: true,
        index: true,
      })
    birthday: Date;
    
    @Prop({
        required: true,
        index: true
    })
    bio?: string;
    
    @Prop({
        index: true
    })
    avatar?: string;


    @Prop({
        type: [],
        default: ['user']
    })
    roles?: string[]

    @Prop({type: [{type: Types.ObjectId, ref: 'Review.name' , required: true}] })
    reviewCollection: Types.Array<Review>;
    

     //thread
    // @Prop({type: [{type: Types.ObjectId, ref: 'Thread.name' , required: true}] })
    // threads: Types.Array<Thread>;
    
    
    @Prop({
      default: true,   
    })
    status: boolean

}


export const UserSchema = SchemaFactory.createForClass(User)
