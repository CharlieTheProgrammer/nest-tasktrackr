import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Table
export class Entry extends Model {
  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  entryDate: Date;

  @Column
  entryDescription: string;

  @Column
  startTime: Date;

  @Column
  endTime: Date;

  @Column
  totalTime: number;

  @BelongsTo(() => Project)
  project: Project;
}
