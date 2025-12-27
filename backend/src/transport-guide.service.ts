import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportGuide } from './transport-guide.entity';
import { User } from './user.entity';

@Injectable()
export class TransportGuideService {
  constructor(
    @InjectRepository(TransportGuide)
    private transportRepo: Repository<TransportGuide>,
  ) {}

  async create(user: User, data: Partial<TransportGuide>): Promise<TransportGuide> {
    const entry = this.transportRepo.create({ ...data, user });
    return this.transportRepo.save(entry);
  }

  async findByUser(user: User): Promise<TransportGuide[]> {
    return this.transportRepo.find({ where: { user: { id: user.id } }, order: { createdAt: 'DESC' } });
  }
}
