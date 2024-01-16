/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientsRepository: Repository<Patient>,
      ) {}
      create(createPatientDto: CreatePatientDto): Promise<Patient> {
        const patient = this.patientsRepository.create(createPatientDto);
        return this.patientsRepository.save(patient);
      }
    
      findAll(): Promise<Patient[]> {
        return this.patientsRepository.find();
      }
    
      findOne(id: number): Promise<Patient> {
        return this.patientsRepository.findOneBy({ id: id });
      }
    
      update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
        return this.patientsRepository.save({ id, ...updatePatientDto });
      }
    
      remove(id: number): Promise<void> {
        return this.patientsRepository.delete(id).then(() => undefined);
      }
    
}
