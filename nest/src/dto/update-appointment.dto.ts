/* eslint-disable prettier/prettier */
import { IsDateString, IsString, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  readonly date?: string;

  @IsOptional()
  @IsString()
  readonly time?: string;
  

}
