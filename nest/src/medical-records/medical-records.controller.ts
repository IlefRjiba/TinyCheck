/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete,UseGuards } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';
import { AuthGuard } from "../auth/auth-jwt.guard";
import { Roles } from "../auth/auth-role.decorator";
import { RoleGuard } from "../auth/roles.guard";
import { Role } from "../enums/role.enum";
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.medicalRecordsService.findAll();
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.medicalRecordsService.findOne(id);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordsService.update(id, updateMedicalRecordDto);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medicalRecordsService.remove(id);
  }
}
