import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';


@Injectable()
export class AuthService {
  constructor(
   
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ){}

  
  async create(createUserDto: CreateUserDto) {

    try {

      const {password, ...useData} = createUserDto

      const user = await this.userModel.create({
        ...useData,
        password: bcrypt.hashSync(password, 10)
      })
      return user;
    } catch (error) {
      this.handleExceptions(error)
      
    }
  }

  async login(loginUserDto:LoginUserDto){
    const {password, email} = loginUserDto

    const user = await this.userModel.findOne({email}).select('email password').exec()

    if(!user)
      throw new UnauthorizedException('Invalid Credentials - email')
    
    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid Credentials - password')
    return user


  }


  private handleExceptions(error: any) {
    if(error.code === 11000){
      throw new BadRequestException(`User exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create user - Check server logs`)
  }
  
}
