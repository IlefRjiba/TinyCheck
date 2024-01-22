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

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Max(12)
  readonly babyAge: number;

  @IsNotEmpty()
  @IsNumber()
  readonly babyWeight: number;

  @IsString()
  Reason: string;
}
