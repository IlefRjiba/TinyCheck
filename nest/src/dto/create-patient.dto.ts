/* eslint-disable prettier/prettier */
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
  @IsNumber()
  @Max(16)
  readonly babyAge: number;

  @IsNotEmpty()
  @IsNumber()
  readonly babyWeight: number;
}
