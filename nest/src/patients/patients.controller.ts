/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Controller ,Get, Post, Body, Put, Param, Delete,UseGuards,} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { AuthGuard } from "../auth/auth-jwt.guard";
import { Roles } from "../auth/auth-role.decorator";
import { RoleGuard } from "../auth/roles.guard";
import { Role } from "../enums/role.enum";
@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

@Post()
create(@Body() createPatientDto: CreatePatientDto) {
  return this.patientsService.create(createPatientDto);
}

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Get()
findAll() {
  return this.patientsService.findAll();
}

@Get(':id')
findOne(@Param('id') id: number) {
  return this.patientsService.findOne(id);
}

@Put(':id')
update(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
  return this.patientsService.update(id, updatePatientDto);
}

@Delete(':id')
remove(@Param('id') id: number) {
  return this.patientsService.remove(id);
}
}