import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
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

  @Column({ type: 'varchar', length: 250 })
  profileImage: string;

  @Column({ type: 'varchar', length: 250 })
  avatarImage: string;

  @Column({ type: 'varchar', length: 250 })
  websiteUrl: string;

  @Column({ type: 'varchar', length: 1000 })
  location: string;

  @Column({ type: 'varchar', length: 1000 })
  bioDescription: string;

  @Column({ type: 'varchar', length: 1000 })
  skills: string;

  @Column({ type: 'varchar', length: 1000 })
  languages: string;

  @Column({ type: 'varchar', length: 1000 })
  learningInfo: string;

  @Column()
  education: string;

  @Column({ type: 'varchar', length: 1000 })
  work: string;

  @Column({ type: 'varchar', length: 1000 })
  job: string;

  @Column({ type: 'varchar', length: 1000 })
  availableFor: string;

  @Column({ default: true })
  isActive: boolean

  // @Column({ default: new Date() })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;


}
