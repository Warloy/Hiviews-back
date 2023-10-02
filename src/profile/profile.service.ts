import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Injectable()
export class ProfileService {
  constructor(
    
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}


  async findAll() {
    try {
      const profile = await this.userModel.find({ status: true });
      return profile;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(term: string) {
    
    let profile: User
 
    
 
    // MongoID
    if( !profile &&isValidObjectId(term)) {
     profile = await this.userModel.findById(term)
    }
    // autor
    if (!profile) {
     profile = await this.userModel.findOne({userName: term.toLocaleLowerCase().trim()})
    }
     
    //Para casos de no encontrar nada
     if(!profile)
       throw new NotFoundException(`review with id, username"${term}" not found`) 
 
     return profile;
   }

 async update(profileId: string, updateProfileDto: UpdateUserDto ) {
    try {
      const existingProfile = await this.userModel.findById(profileId);

      if (!existingProfile) {
        throw new NotFoundException(`Profile with ID "${profileId}" not found`);
      }

      if (!existingProfile.status) {
        throw new BadRequestException(`Profile with ID "${profileId}" is not active`);
      }

      if (updateProfileDto.userName) {
        updateProfileDto.userName = updateProfileDto.userName.toLowerCase();
      }

      const updatedProfile = await this.userModel.findByIdAndUpdate(profileId, updateProfileDto, { new: true });

      return {
        profile: updatedProfile,
        message: 'Profile updated successfully.',
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }


  async remove(profileId: string) {
    try {
      const existingProfile = await this.userModel.findById(profileId);

      if (!existingProfile) {
        throw new NotFoundException(`Review with ID "${profileId}" not found`);
      }

      if (!existingProfile.status) {
        throw new BadRequestException(`Review with ID "${profileId}" is already inactive`);
      }

      // Actualizar el campo status a false
      existingProfile.status = false;
      await existingProfile.save();

      return { message: 'Profile deactivated successfully' };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`User already exists in the database: ${JSON.stringify(error.keyValue)}`);
    }

    console.log(error);
    throw new InternalServerErrorException(`Can't create review - Check server logs`);
  }


}
