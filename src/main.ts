import { NestFactory } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { AppModule } from './app.module';
import { Category } from './core/entities/category.entity';
import { Entry } from './core/entities/entry.entity';
import { Project } from './core/entities/project.entity';
import { User } from './core/entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  // Sync doesn't work at the Module level, I had to call sync on each model.
  // await User.sync({ force: true })
  // await Project.sync({ force: true })
  // await Category.sync({ force: true })
  // await Entry.sync({ force: true })

  let users = await User.findAll();
  
  users.map(user => console.log(user.toJSON()))
}
bootstrap();
