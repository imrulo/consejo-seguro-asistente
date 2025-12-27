import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { User } from './user.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private profileRepository: Repository<UserProfile>,
  ) {}

  async createOrUpdate(user: User, data: Partial<UserProfile>): Promise<UserProfile> {
    let profile = await this.profileRepository.findOne({ where: { user: { id: user.id } }, relations: ['user'] });
    if (!profile) {
      profile = this.profileRepository.create({ ...data, user });
    } else {
      Object.assign(profile, data);
    }
    return this.profileRepository.save(profile);
  }

  async getByUser(user: User): Promise<UserProfile | null> {
    return this.profileRepository.findOne({ where: { user: { id: user.id } }, relations: ['user'] });
  }
}
