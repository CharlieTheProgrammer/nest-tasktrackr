import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Entry } from 'src/core/entities/entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry)
    private userModel: typeof Entry,
  ) {}

  async create(@Body() createEntryDto: CreateEntryDto) {
    const entry = await Entry.create(createEntryDto);
    console.log(entry.toJSON());
    return {
      message: 'ok'
    };
  }

  async findAll() {
    return await Entry.findAll();
  }

  async findOne(id: number) {
    return await Entry.findByPk(id);
  }

  async update(id: number, @Body() updateEntryDto: UpdateEntryDto) {
    return await Entry.update(updateEntryDto, {
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} entry`;
  }
}
