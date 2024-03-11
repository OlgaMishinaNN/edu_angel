import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async create(createItemDto: CreateUserDto): Promise<User> {
    const newUser = this.repository.create(createItemDto);
    return this.repository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id?: string, email?: string, includeDeleted = true) {
    const user = await this.repository.findOne({
      where: [{ id: id }, { email: email }],
      withDeleted: includeDeleted,
    });

    return user;
  }

  async update(id: string, updateUserDto: any): Promise<UpdateResult> {
    return await this.repository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<UpdateResult> {
    return await this.repository.softDelete(id);
  }
}
