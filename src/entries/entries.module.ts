import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { Entry } from 'src/core/entities/entry.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Entry])],
  controllers: [EntriesController],
  providers: [EntriesService]
})
export class EntriesModule {}
