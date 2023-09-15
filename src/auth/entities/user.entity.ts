import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



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
    userName: string
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
    lastName: string;

    @Prop({
        required: true,
        index: true,
      })
    birthday: Date;
    
    @Prop({
        required: true,
        index: true
    })
    gender: string


    @Prop({
        type: String,
        enum: ['admin', 'user'],
        default: 'user'   
    })
    role: string
    
    @Prop({
      default: true,   
    })
    status: boolean

}


export const UserSchema = SchemaFactory.createForClass(User)
