import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Entry } from './entry.entity';
import { User } from './user.entity';

@Table
export class Category extends Model {
  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  hidden: boolean;

  @HasMany(() => Entry)
  entries: Entry[];

  @BelongsTo(() => User)
  user: User;
}
