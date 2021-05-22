import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { EntriesModule } from './entries/entries.module';
import { User } from './core/entities/user.entity';
import { Project } from './core/entities/project.entity';
import { Category } from './core/entities/category.entity';
import { Entry } from './core/entities/entry.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: '/home/charlieo/Sites/nest-tasktrackr/data/tasktrackr.db',
      models: [User, Project, Category, Entry],
      logQueryParameters: true,
      logging: true,
      sync: {
        force: false,
        alter: false,
        
      },
      synchronize: false,
      
    }),
    ProjectsModule,
    UsersModule,
    CategoriesModule,
    EntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(process.env.DB_PATH);
  }
}
