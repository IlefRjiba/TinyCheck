/* eslint-disable prettier/prettier */
// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

import {jwtConstants} from "./constants";
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret || 'SecretKey', // Remplacez par une clé secrète forte en production
      signOptions: { expiresIn: '1h' }, // Optionnel : définir la durée de validité du token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [ AuthService,JwtModule],
})
export class AuthModule {}

