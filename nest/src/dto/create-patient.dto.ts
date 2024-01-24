/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber , IsOptional} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;



  @IsNotEmpty()
  @IsString()
  readonly Babyname: string;

  @IsNotEmpty()
  @IsString()
  readonly Babyage: string;

  @IsNotEmpty()
  @IsNumber()
  readonly babypoid: number;
  
  @IsOptional()
  @IsString()
  Reason: string;
}
