import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthEmergency } from './health-emergency.entity';
import { User } from './user.entity';

@Injectable()
export class HealthEmergencyService {
  constructor(
    @InjectRepository(HealthEmergency)
    private healthRepo: Repository<HealthEmergency>,
  ) {}

  async create(user: User, data: Partial<HealthEmergency>): Promise<HealthEmergency> {
    const entry = this.healthRepo.create({ ...data, user });
    return this.healthRepo.save(entry);
  }

  async findByUser(user: User): Promise<HealthEmergency[]> {
    return this.healthRepo.find({ where: { user: { id: user.id } }, order: { createdAt: 'DESC' } });
  }
}
