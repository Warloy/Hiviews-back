import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
      }]),
    AuthModule
  ],
  exports: [
    MongooseModule,
  ]
})
export class ProfileModule {}
