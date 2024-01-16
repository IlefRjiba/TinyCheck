/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';

export class UpdateMedicalRecordDto {
  @IsOptional()
  @IsString()
  readonly notes?: string;


}
