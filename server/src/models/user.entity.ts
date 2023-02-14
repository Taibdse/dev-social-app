import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  avatarImage: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  websiteUrl: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  bioDescription: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  skills: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  languages: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  learningInfo: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  education: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  work: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  job: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  availableFor: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
