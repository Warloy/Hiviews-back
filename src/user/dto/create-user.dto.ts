import { IsAlpha, IsDateString, IsEmail, IsIn, IsString, Matches, MinLength, Min, IsInt, IsPositive } from 'class-validator';



export class CreateUserDto {
    @IsPositive()
    @IsInt()
    @Min(1)
    userId:number

    @IsEmail()
    @IsString()
    email: string;
    
    @IsString()
    @Matches(/.*[a-zA-Z].*/)
    @MinLength(4)
    userName: string

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


}
