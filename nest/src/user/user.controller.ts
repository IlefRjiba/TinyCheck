/* eslint-disable prettier/prettier */
// user.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';

import { User } from '../entities/user.entity';
import { AuthGuard } from "../auth/auth-jwt.guard";
import { Roles } from "../auth/auth-role.decorator";
import { RoleGuard } from "../auth/roles.guard";
import { Role } from "../enums/role.enum";
import { UpdateUserDto } from "../dto/update-user.dto";
import { AuthService } from '../auth/auth.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService,
    private authService: AuthService) {}

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }


  @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  @Put('update-user/:userId')
  async updateUser(
    @Param('userId') userId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Get('get-user/:userId')
  getUserById(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.getUserById(userId);
  }


  @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  @Get('get-all-users')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}