/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from '../entities/medical-record.entity';
import { CreateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordsRepository: Repository<MedicalRecord>,
  ) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecord> {
    const medicalRecord = this.medicalRecordsRepository.create(createMedicalRecordDto);
    return this.medicalRecordsRepository.save(medicalRecord);
  }

  async findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordsRepository.find();
  }

  async findOne(id: number): Promise<MedicalRecord> {
    const medicalRecord = await this.medicalRecordsRepository.findOneBy({ id });
    if (!medicalRecord) {
      throw new NotFoundException(`Medical Record with ID "${id}" not found`);
    }
    return medicalRecord;
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecord> {
    const medicalRecord = await this.findOne(id);
    const updated = Object.assign(medicalRecord, updateMedicalRecordDto);
    return this.medicalRecordsRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.medicalRecordsRepository.delete(id);
  }
}

