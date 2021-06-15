import { Module } from '@nestjs/common';
import { EntriesModule } from 'src/entries/entries.module';
import { ProjectEntriesController } from './project-entries.controller';

@Module({
  controllers: [ProjectEntriesController],
  imports: [EntriesModule]
})
export class ProjectEntriesModule {}
