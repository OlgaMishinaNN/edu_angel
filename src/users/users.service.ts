import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findById(id: string) {
    const user = await this.repository.findOne({
      where: { id: id },
      withDeleted: true,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({
      where: { email: email },
      withDeleted: true,
    });

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, updateUserDto as User);
  }

  async remove(id: string): Promise<UpdateResult> {
    return await this.repository.softDelete(id);
  }
}
