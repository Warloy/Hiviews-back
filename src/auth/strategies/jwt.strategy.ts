import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from "@nestjs/mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Model } from "mongoose";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      @InjectModel(User.name) // Asegúrate de importar el modelo de usuario de Mongoose
      private readonly userModel: Model<User>,
      configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    
    try {
      const user = await this.userModel.findOne({_id: id, status: true}).exec();

      if (!user) {
        throw new UnauthorizedException('Token not valid');
      }



      if (user.status === false) {
        throw new UnauthorizedException('User is inactive, talk with an admin');
      }
      

      return user;
    } catch (error) {
      throw new UnauthorizedException('Token not valid');
    }
  }
}
