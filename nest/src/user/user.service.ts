/* eslint-disable prettier/prettier */
// users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from "../enums/role.enum";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async updateUser(userId, dto: UpdateUserDto) {
    await this.userRepository.update(userId, { ...dto, role: dto.role as Role });
  }

  async getUserById(userId): Promise<User> {
    return await this.userRepository.findOne(userId);
  }

  async getUserByEmail(email): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}

