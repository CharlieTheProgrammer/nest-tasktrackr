import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Entry } from './entry.entity';
import { User } from './user.entity';

@Table
export class Project extends Model {
  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  hidden: boolean;

  @Column
  dateCreated: Date;

  @HasMany(() => Entry)
  entries: Entry[];

  @BelongsTo(() => User)
  user: User;
}
