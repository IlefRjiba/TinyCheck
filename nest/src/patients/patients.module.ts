/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Patient]), AuthModule],
  providers: [PatientsService],
  controllers: [PatientsController]
})
export class PatientsModule {}
