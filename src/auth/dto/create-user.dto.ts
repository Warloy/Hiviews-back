import { IsAlpha, IsDateString, IsEmail, IsString, Matches, MinLength, MaxLength, IsArray, IsOptional, IsUrl } from 'class-validator';



export class CreateUserDto {
 
    @IsEmail()
    @IsString()
    email: string;
    
    @IsString()
    @Matches(/.*[a-zA-Z].*/)
    @MinLength(4)
    username: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string

    @IsString()
    @IsAlpha()
    @MinLength(3)
    name: string;
    
    @IsString()
    @IsAlpha()
    @MinLength(3)
    surname: string;
    
    //Version I Format YYYY-DD-MM
    @IsDateString()
    birthday: Date;
    

    @IsString()
    @MaxLength(255)
    @IsOptional()
    bio?: string

    @IsString()
    @IsUrl()
    @IsOptional()
    avatar?: string


    @IsArray()
    @IsOptional()
    roles?: string;

}