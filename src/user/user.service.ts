import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model, isValidObjectId, now} from 'mongoose';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';


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

  findAll(paginationDto: PaginationDto) {
    
    const {limit = 10, offset = 0} = paginationDto
    return this.userModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        nro: 1
      })

  }
  async findOne(term: string) {
    let user: User

    //Si queremos buscar por nro
    
   if(!isNaN(+term)){

    user = await this.userModel.findOne({userId: term})

   }

    // Si queremos buscar por el mongo ID
    if( !user &&isValidObjectId(term)){
      user = await this.userModel.findById(term)
    }
    //Si queremos buscar por username
    if (! user) {
      user = await this.userModel.findOne({userName: term.toLocaleLowerCase().trim()})
     }
    
    //Para casos de no encontrar nada
    if(!user)
    throw new NotFoundException(`user with id,username or nro "${term}" not found`) 

  return user;

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


