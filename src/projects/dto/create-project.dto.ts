import { IsNotEmpty, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;
  
  @IsInt()
  userId: bigint;
  
  @IsOptional()
  @IsBoolean()
  hidden?: boolean;
}
