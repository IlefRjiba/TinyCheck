/* eslint-disable prettier/prettier */
// update-user.dto.ts
import {IsEmail, IsString, Length} from "class-validator";


export class UpdateUserDto {

    @IsEmail({}, {message: 'email must be an email (user@gmail.com)'})
    email: string;

    @IsString( {message: 'must be a string'})
    @Length(6, 15, {message: 'must be longer than or equal to 6 characters'})
    username: string;
    
    @IsString()
    role: string;
}
