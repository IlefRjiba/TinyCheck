/* eslint-disable prettier/prettier */
// update-user.dto.ts
import { PartialType } from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString} from "class-validator";
import { CreateUserDto } from "./create-user.dto";


export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    readonly updatedAt: Date;
}