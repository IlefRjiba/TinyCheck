/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { create } from 'domain';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  phone: number;

 
}
