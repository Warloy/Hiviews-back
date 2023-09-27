import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
   
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ){}


  async create(createUserDto: CreateUserDto) {

    createUserDto.email = createUserDto.email.toLocaleLowerCase().trim()
    try {

      const {password, ...useData} = createUserDto

      const user = await this.userModel.create({
        ...useData,
        password: bcrypt.hashSync(password, 10)
      })
      return {
        data: user,
        token: this.getJwtToken({id: user._id}),
        statusCode: HttpStatus.CREATED
      };
    } catch (error) {
      this.handleExceptions(error)
      
    }
  }

  async login(loginUserDto:LoginUserDto){
    const {password, email} = loginUserDto

    const user = await this.userModel.findOne({email}).select('email password _id').exec()

    if(!user)
      throw new UnauthorizedException('Invalid Credentials - email')
    
    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid Credentials - password')
    
      return {
        data: user,
        token: this.getJwtToken({id: user._id}),

      };


  }

  private getJwtToken(payload: JwtPayload ){
     const token = this.jwtService.sign(payload);
     return token;
  }

  private handleExceptions(error: any) {
    if(error.code === 11000){
      throw new BadRequestException(`User exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create user - Check server logs`)
  }
  
}
