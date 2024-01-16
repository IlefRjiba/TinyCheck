/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsNotEmpty()
  @IsString()
  readonly notes: string;

}
