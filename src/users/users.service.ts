import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/core/entities/user.entity';
import { MailService } from 'src/core/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sendMail: MailService
  ) {}

  async create(@Body() createUserDto: CreateUserDto) {
    const user = await User.create(createUserDto);
    console.log(user.toJSON());
    await this.sendMail.welcome({to: user.email});
    return {
      message: 'ok'
    };
  }

  async findAll() {
    return await User.findAll();
  }

  async findOne(id: number) {
    await this.sendMail.welcome({to: 'testing@test.com'});
    return await User.scope(['withProjects.withEntries', 'withEntries']).findByPk(id);
  }

  async findUserByLogin(login: string) {
    return await User.scope('withPassword').findOne({
      where: {login}
    });
  }

  async findUserByEmail(email: string) {
    return await User.scope('withPassword').findOne({
      where: {email}
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
