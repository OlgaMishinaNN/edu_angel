import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { unique: true, nullable: false, length: 255 })
  @IsEmail()
  email!: string;

  @Column('varchar', { nullable: false, length: 100 })
  first_name!: string;

  @Column('varchar', { nullable: false, length: 100 })
  last_name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
