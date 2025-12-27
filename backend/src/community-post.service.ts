import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityPost } from './community-post.entity';
import { User } from './user.entity';

@Injectable()
export class CommunityPostService {
  constructor(
    @InjectRepository(CommunityPost)
    private postRepo: Repository<CommunityPost>,
  ) {}

  async create(user: User, data: Partial<CommunityPost>): Promise<CommunityPost> {
    const entry = this.postRepo.create({ ...data, user });
    return this.postRepo.save(entry);
  }

  async findAll(): Promise<CommunityPost[]> {
    return this.postRepo.find({ order: { createdAt: 'DESC' }, relations: ['user'] });
  }

  async findByUser(user: User): Promise<CommunityPost[]> {
    return this.postRepo.find({ where: { user: { id: user.id } }, order: { createdAt: 'DESC' } });
  }
}
