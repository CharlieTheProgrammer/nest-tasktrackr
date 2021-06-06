import { IsOptional, IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { emptyStringToNull } from 'src/core/helpers';

export class CreateEntryDto {
  // This has no decorator and that will trigger this property to be removed
  // when request object is transformed by the validation pipe 
  id?: null;

  @IsNotEmpty()
  projectId: bigint;
  
  @IsOptional()
  @Transform(emptyStringToNull)
  categoryId: bigint;
  
  @IsNotEmpty()
  userId: bigint;

  @IsOptional()
  @IsString()
  description: string;

  @IsInt()
  totalSeconds: number;

}
