import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async create(createItemDto: CreateUserDto): Promise<User> {
    const newUser = this.repository.create(createItemDto);
    return this.repository.save(newUser);
  }

  async findAll(query: QueryDto) {
    const queryBuilder: SelectQueryBuilder<User> =
      this.repository.createQueryBuilder('users_list');

    const users = queryBuilder
      .orderBy(`users_list.${query.sort}`, query.order)
      .limit(query.limit)
      .offset(query.offset);

    if (query.showDeleted) {
      users.withDeleted();
    }
    return users.getMany();
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
