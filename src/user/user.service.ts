import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model, now} from 'mongoose';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
   
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ){}

    


  async create(createUserDto: CreateUserDto) {

    

    createUserDto.email = createUserDto.email
    

    try {
      const user = await this.userModel.create(createUserDto)
      return user;
    } catch (error) {
      this.handleExceptions(error)
      
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }



  private handleExceptions(error: any) {
    if(error.code === 11000){
      throw new BadRequestException(`User exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create user - Check server logs`)
  }
  


}


