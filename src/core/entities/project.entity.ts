import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { Entry } from './entry.entity';
import { User } from './user.entity';

@Table
export class Project extends Model {
  @PrimaryKey
  @Column
  readonly  id: bigint;

  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: bigint;

  @Column
  hidden: boolean;

  @HasMany(() => Entry)
  entries: Entry[];

  @BelongsTo(() => User)
  user: User;
}
