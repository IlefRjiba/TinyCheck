/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;
  @IsNotEmpty()
  @IsString()
  readonly babyName: string;

  @IsNotEmpty()
  @IsNumber()
  readonly babyAge: number;

  @IsNotEmpty()
  @IsNumber()
  readonly babyWeight: number;
  @IsNotEmpty()
  @IsString()
  Reason: string;
}
