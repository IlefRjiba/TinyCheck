/* eslint-disable prettier/prettier */
import {IsEmail, IsString, Length,IsNumberString, IsNotEmpty} from "class-validator";

export class LoginUserDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsNotEmpty()
  @IsNumberString()
  @Length(8, 8)
  readonly phone: number;
}