import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{
        name: Category.name,
        schema: CategorySchema
      }]),
    AuthModule
  ],
  exports: [
    MongooseModule,
  ]
})
export class CategoryModule {}
