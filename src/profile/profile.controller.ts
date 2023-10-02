import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ParseMongoIdPipe } from 'src/common/dto/pipes/parse-mongo-id.pipe';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { Auth } from 'src/auth/decorators';

@Controller('profile')
@Auth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.profileService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateProfileDto: UpdateUserDto) {
    return this.profileService.update(term, updateProfileDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.profileService.remove(id);
  }
}
