import {
  Table,
  Column,
  Model,
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
  projectId: bigint;

  @ForeignKey(() => Category)
  @Column
  categoryId: bigint;

  @ForeignKey(() => User)
  @Column
  userId: bigint;

  @Column
  description: string;

  @Column
  totalSeconds: number;


  @BelongsTo(() => Project)
  project: Project;
}
