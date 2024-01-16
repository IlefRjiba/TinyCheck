/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  readonly name?: string;
  

  
  @IsOptional()
  @IsString()
  readonly lastname?: string;


  @IsOptional()
  @IsString()
  readonly babyName?: string;

  @IsOptional()
  @IsNumber()
  readonly babyAge?: number;

  @IsOptional()
  @IsNumber()
  readonly babyWeight?: number;
}
