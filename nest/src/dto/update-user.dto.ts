/* eslint-disable prettier/prettier */
// update-user.dto.ts
import {IsEmail, IsOptional, IsString} from "class-validator";


export class UpdateUserDto {

   
    
    
    @IsOptional()
    @IsEmail({}, {message: 'email must be an email (user@gmail.com)'})
    email: string;

    @IsOptional()
    @IsString( {message: 'must be a string'})
    username: string;
    
    @IsOptional()
    @IsString()
    role: string;
}