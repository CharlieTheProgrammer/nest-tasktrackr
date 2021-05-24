import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/core/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private userModel: typeof Category,
  ) {}

  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await Category.create(createCategoryDto);
    console.log(category.toJSON());
    return {
      message: 'ok'
    };
  }

  async findAll() {
    return await Category.findAll();
  }

  async findOne(id: number) {
    return await Category.findByPk(id);
  }

  async update(id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await Category.update(updateCategoryDto, {
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

