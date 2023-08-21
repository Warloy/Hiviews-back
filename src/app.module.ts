import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
 
//paquetes de node usualmente van al inicio.

@Module({ 
  imports: [ 
    ServeStaticModule.forRoot({ 
         rootPath: join(__dirname,'..','public'), 
    }), UserModule, ReviewModule, 
    // En esta parte se va configurar la conexion con la BD
     
  ], 

  

}) 
export class AppModule {} 