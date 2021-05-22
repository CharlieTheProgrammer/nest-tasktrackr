import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [ProjectsModule, UsersModule, CategoriesModule, EntriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
