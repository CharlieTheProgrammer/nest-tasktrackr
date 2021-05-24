import { IsOptional, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEntryDto {
  // This has no decorator and that will trigger this property to be removed
  // when request object is transformed by the validation pipe 
  id?: null;

  @IsNotEmpty()
  projectId: bigint;
  
  @IsNotEmpty()
  categoryId: bigint;
  
  @IsNotEmpty()
  userId: bigint;

  description: string;

  @IsDateString()
  startTime: Date;
  
  @IsDateString()
  endTime: Date;

}
