import { join } from 'path';
// Mantener los paquetes de nest en la parte superior
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';


import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
 
//paquetes de node usualmente van al inicio.

@Module({ 
  imports: [ 
    ServeStaticModule.forRoot({ 
         rootPath: join(__dirname,'..','public'), 
    }), UserModule, ReviewModule, 
    // En esta parte se va configurar la conexion con la BD
    MongooseModule.forRoot('mongodb://localhost:27017/backend-hiviews')
     
  ], 

  

}) 
export class AppModule {} 