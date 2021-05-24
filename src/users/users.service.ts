import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/core/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(@Body() createUserDto: CreateUserDto) {
    const user = await User.create(createUserDto);
    console.log(user.toJSON());
    return {
      message: 'ok'
    };
  }

  async findAll() {
    return await User.findAll();
  }

  async findOne(id: number) {
    return await User.scope(['withProjects.withEntries', 'withEntries']).findByPk(id);
  }

  async findUserByLogin(login: string) {
    return await User.scope('withPassword').findOne({
      where: {login}
    });
  }

  async update(id: number, @Body() updateUserDto: UpdateUserDto) {
    return await User.update(updateUserDto, {
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
