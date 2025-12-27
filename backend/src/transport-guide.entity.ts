import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class TransportGuide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column()
  fromLocation: string;

  @Column()
  toLocation: string;

  @Column('text', { nullable: true })
  routeInfo: string;

  @Column('text', { nullable: true })
  aiResponse: string;

  @Column({ nullable: true })
  transportType: string; // e.g. "bus", "tranvía", "a pie"

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
