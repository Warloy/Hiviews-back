import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(@Inject(Category.name) private CategoryModel) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new Category(createCategoryDto);
    this.CategoryModel (createCategoryDto);
    return await this.CategoryModel.save(createdCategory);
  }
  
  async findAll(): Promise<Category[]> {
    return await this.CategoryModel.find();
  }

  
  async findOne(id: number): Promise<Category> {
    return await this.CategoryModel.findById(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const categoryToUpdate = await this.CategoryModel.findById(id);
    if (!categoryToUpdate) {
      throw new Error('Category not found');
    }

    categoryToUpdate.name = updateCategoryDto.name;

    return await this.CategoryModel.save(categoryToUpdate);
  }
  
  async remove(id: number): Promise<void> {
    const categoryToRemove = await this.CategoryModel.findById(id);
    if (!categoryToRemove) {
      throw new Error('Category not found');
    }

    await this.CategoryModel.deleteOne(categoryToRemove);
  }
}
