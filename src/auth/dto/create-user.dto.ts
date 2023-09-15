import { IsAlpha, IsDateString, IsEmail, IsIn, IsString, Matches, MinLength, MaxLength, IsArray } from 'class-validator';



export class CreateUserDto {
 
    @IsEmail()
    @IsString()
    email: string;
    
    @IsString()
    @Matches(/.*[a-zA-Z].*/)
    @MinLength(4)
    userName: string

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
    lastName: string;
    
    //Version I Format YYYY-DD-MM
    @IsDateString()
    birthday: Date;
    

    @IsIn(['m', 'f','o'])
    gender: string

    @IsString()
    role: string;

}