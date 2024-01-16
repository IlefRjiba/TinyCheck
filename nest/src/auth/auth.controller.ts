/* eslint-disable prettier/prettier */
// auth.controller.ts

import { Controller, Post, Body,UseGuards,Get , Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from "../dto/login-user.dto";
import { AuthGuard } from "./auth-jwt.guard";
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @UseGuards(AuthGuard)
  @Get('check')
  async checkAuth(@Req() req) {
      return await this.authService.checkAuth(req.user)
  }
}

