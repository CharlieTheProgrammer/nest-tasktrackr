import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateUserDto {
  id?: null;
  
  @IsNotEmpty()
  firstName: string;
  
  @IsNotEmpty()
  lastName: string;
  
  @IsNotEmpty()
  login: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
}
