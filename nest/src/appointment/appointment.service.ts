/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Appointment } from '../entities/Appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { CreatePatientDto } from 'src/dto/create-patient.dto';
import { Patient } from 'src/entities/patient.entity';

@Injectable()
export class AppointmentsService {
  
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private connection: Connection
  ) {}

  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID "${id}" not found`);
    }
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const newCv = await this.appointmentRepository.preload({
      id,
      ...updateAppointmentDto,
    })
    return this.appointmentRepository.save(newCv);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.appointmentRepository.delete(id);
  }

  async findAllByUserId(id: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {
        userId: id,
      },
      
    });
  }

}