import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Entry } from './entry.entity';
import { Project } from './project.entity';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  login: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  password_reset_token: string;

  @HasMany(() => Entry)
  entries: Entry[];

  @HasMany(() => Category)
  categories: Category[];

  @HasMany(() => Project)
  projects: Project[];
}
