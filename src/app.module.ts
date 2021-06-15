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
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HashModule } from './core/hash/hash.module';
import { ProjectEntriesModule } from './project-entries/project-entries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.DB_PATH,
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
    ProjectEntriesModule,
    AuthModule,
    MailerModule.forRoot({
      transport: `${process.env.MAIL_MAILER}://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`,
    }),
    HashModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(process.env.DB_PATH);
    console.log(process.env.APP_SECRET);
  }
}
