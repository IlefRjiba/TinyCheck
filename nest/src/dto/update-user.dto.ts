/* eslint-disable prettier/prettier */
// update-user.dto.ts
import {IsEmail, IsString} from "class-validator";


export class UpdateUserDto {

    @IsEmail({}, {message: 'email must be an email (user@gmail.com)'})
    email: string;

    @IsString( {message: 'must be a string'})
    username: string;
    
    @IsString()
    role: string;
}
