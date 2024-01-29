/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { Appointment } from '../entities/Appointment.entity';

@Controller('appointment')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appointmentsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appointmentsService.remove(id);
  }

  @Get('/user/:userId')
  getAppointmentsByUserId(@Param('userId', ParseIntPipe) id: number) {
  return this.appointmentsService.findAllByUserId(id);
}
}
