import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class HealthEmergency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column()
  topic: string; // e.g. "fiebre", "urgencia", "farmacia"

  @Column('text')
  message: string;

  @Column('text', { nullable: true })
  aiResponse: string;

  @Column({ nullable: true })
  urgencyLevel: string; // e.g. "alta", "media", "baja"

  @Column({ nullable: true })
  sentiment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
