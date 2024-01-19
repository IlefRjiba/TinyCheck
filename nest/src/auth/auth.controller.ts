/* eslint-disable prettier/prettier */
// auth.controller.ts

import { Controller, Post, Body,UseGuards,Get , Req,UnauthorizedException} from '@nestjs/common';
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
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      // Les informations d'identification ne sont pas valides
      throw new UnauthorizedException('Identifiants incorrects');
    }

    // Authentification réussie, générez un token
    const token = await this.authService.generateToken(user);

    return {
      access_token: token,
    };
  }
  @UseGuards(AuthGuard)
  @Get('check')
  async checkAuth(@Req() req) {
      return await this.authService.checkAuth(req.user)
  }
}

