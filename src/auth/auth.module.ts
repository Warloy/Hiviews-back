import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
      }]),
      PassportModule.register({defaultStrategy: 'jwt'}),
      //Para configurando el modulo de JWT
      JwtModule.registerAsync({
        imports: [],
        inject: [],
        useFactory: () => {
          return {
            secret: process.env.JWT_SEED,
            signOptions: {
              expiresIn: "1h"
            }
          }
        }
      })
      
  ],
  exports: [
    MongooseModule
  ]
})
export class AuthModule {}
