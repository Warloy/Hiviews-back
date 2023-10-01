import { existsSync } from 'fs';
import { join } from 'path';

import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FilesService {
 

  getStaticReviewtImage( imageName: string ) {

    const path = join( __dirname, '../../static/reviews', imageName );

    if ( !existsSync(path) ) 
        throw new BadRequestException(`No review found with image ${ imageName }`);

    return path;
}

  getStaticThreadImage( imageName: string ) {

    const path = join( __dirname, '../../static/threads', imageName );

    if ( !existsSync(path) ) 
        throw new BadRequestException(`No thread found with image ${ imageName }`);

    return path;
}



}
