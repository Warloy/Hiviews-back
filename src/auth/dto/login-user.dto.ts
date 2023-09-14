import { IsAlpha, IsDateString, IsEmail, IsIn, IsString, Matches, MinLength, MaxLength, IsOptional } from 'class-validator';



export class LoginUserDto {
 
    @IsEmail()
    @IsString()
    email: string;
    
    @IsString()
    @Matches(/.*[a-zA-Z].*/)
    @MinLength(4)
    @IsOptional()
    userName?: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string

}