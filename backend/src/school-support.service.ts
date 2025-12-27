import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolSupport } from './school-support.entity';
import { User } from './user.entity';

@Injectable()
export class SchoolSupportService {
  constructor(
    @InjectRepository(SchoolSupport)
    private schoolRepo: Repository<SchoolSupport>,
  ) {}

  async create(user: User, data: Partial<SchoolSupport>): Promise<SchoolSupport> {
    const entry = this.schoolRepo.create({ ...data, user });
    return this.schoolRepo.save(entry);
  }

  async findByUser(user: User): Promise<SchoolSupport[]> {
    return this.schoolRepo.find({ where: { user: { id: user.id } }, order: { createdAt: 'DESC' } });
  }
}
