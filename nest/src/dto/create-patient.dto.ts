/* eslint-disable prettier/prettier */
import { Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber ,Max} from 'class-validator';

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
  @IsString()
  readonly babyAge: string;

  @IsNotEmpty()
  @IsNumber()
  readonly babyWeight: number;

  @IsString()
  Reason: string;
}
