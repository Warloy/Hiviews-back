import { join } from 'path';
// Mantener los paquetes de nest en la parte superior
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

// Importacion de modulos
import { ReviewModule } from './review/review.module';
import { ThreadModule } from './thread/thread.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
 

@Module({ 
  imports: [ 
    ServeStaticModule.forRoot({ 
         rootPath: join(__dirname,'..','public'), 
    }), 
    //Modulos
    AuthModule, ReviewModule, ThreadModule, CommentModule,
    PostModule, TagModule, CategoryModule, 
    // En esta parte se va configurar la conexion con la BD
    MongooseModule.forRoot('mongodb://localhost:27017/backend-hiviews'), 
    
     
  ], 

  

}) 
export class AppModule {} 