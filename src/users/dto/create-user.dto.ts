import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // This has no decorator and that will trigger this property to be removed
  // when request object is transformed by the validation pipe 
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
