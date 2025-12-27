import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  countryOfOrigin: string;

  @Column({ nullable: true })
  hasChildren: boolean;

  @Column({ nullable: true })
  migrationStatus: string;

  @Column({ nullable: true })
  onboardingCompleted: boolean;

  @Column({ nullable: true })
  gpsLocation: string;

  @Column({ nullable: true })
  customPreferences: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
