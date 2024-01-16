/* eslint-disable prettier/prettier */
import {IsEmail, IsString, Length,IsNumberString, IsNotEmpty} from "class-validator";

export class LoginUserDto {

    @IsEmail({}, {message: 'email must be an email (user@gmail.com)'})
    email: string;

    @IsString({message: 'must be a string'})
    @Length(6, 20, {message: 'must be longer than or equal to 6 characters'})
    password: string;

    @IsNotEmpty()
  @IsNumberString()
  @Length(8, 8)
  readonly phone: number;
}