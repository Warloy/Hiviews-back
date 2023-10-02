import { IsIn, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @IsIn(['Cinéfilo','Discusión', 'Memes','Offtopic','Trending',])
    name: string;

    

}
