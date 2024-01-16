/* eslint-disable prettier/prettier */
import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  readonly date: string; // Utilisez IsDateString si la date est transmise en tant que chaîne

  @IsString()
  @IsNotEmpty()
  readonly time: string; // Format HH:MM par exemple
 
  
}
