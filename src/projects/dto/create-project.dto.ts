import { IsNotEmpty, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateProjectDto {
  // This has no decorator and that will trigger this property to be removed
  // when request object is transformed by the validation pipe 
  id?: null;

  @IsNotEmpty()
  name: string;
  
  @IsInt()
  userId: bigint;
  
  @IsOptional()
  @IsBoolean()
  hidden?: boolean;
}
