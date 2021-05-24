import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  IsEmail,
  AllowNull,
  DefaultScope,
  Scopes,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { Entry } from './entry.entity';
import { Project } from './project.entity';

@DefaultScope(() => ({
  attributes: ['id', 'firstName', 'lastName', 'login', 'email', 'createdAt', 'updatedAt'],
}))

@Scopes(() => ({
  withPassword: {
    attributes: ['id', 'firstName', 'lastName', 'login', 'email', 'password', 'createdAt', 'updatedAt'],
  },
  withProjects: {
    include: [Project]
  },
  withEntries: {
    include: [Entry]
  },
  'withProjects.withEntries': {
    include: {
      model: Project,
      include: [{
        model: Entry
      }]
    }
  }
}))

@Table
export class User extends Model {
  @PrimaryKey
  // @AllowNull(false)
  @Column
  readonly  id: bigint;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  login: string;

  @AllowNull(false)
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  passwordResetToken: string;

  @HasMany(() => Entry)
  entries: Entry[];

  @HasMany(() => Category)
  categories: Category[];

  @HasMany(() => Project)
  projects: Project[];
}
