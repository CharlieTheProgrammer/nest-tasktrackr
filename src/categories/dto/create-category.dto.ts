
import { IsBoolean, IsNotEmpty, IsInt, IsString } from 'class-validator';
export class CreateCategoryDto {
  // This has no decoraQtor and that will trigger this property to be removed
  // when request object is transformed by the validation pipe 
  id?: null;

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsInt()
  userId: bigint;

  @IsBoolean()
  hidden: boolean;

}
