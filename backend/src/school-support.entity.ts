import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class SchoolSupport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column()
  topic: string; // e.g. "adaptación", "bullying", "bienestar escolar"

  @Column('text')
  message: string;

  @Column('text', { nullable: true })
  aiResponse: string;

  @Column({ nullable: true })
  sentiment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
