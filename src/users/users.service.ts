import { Injectable, HttpStatus, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async create(createItemDto: CreateUserDto): Promise<User> {
    const existingUser = await this.repository.findOne({
      where: { email: createItemDto.email },
    });

    if (existingUser) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: `Email address "${createItemDto.email}" already registered.`,
        element: 'email',
      });
    }

    const newUser = this.repository.create(createItemDto);
    return this.repository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.repository.findOne({
      where: { id: id },
      withDeleted: true
    });
    if (!user) {
      throw new NotFoundException(id);
    }
   return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<User | null> {
    const existingUser = await this.repository.findOne({
      where: { id: id, deleted_at: IsNull() },
    });

    if (!existingUser) {
      throw new NotFoundException(id);
    }

    const deleteResponse = await this.repository.softDelete({id});
    if (!deleteResponse.affected) {
      throw new NotFoundException(id);
    }

    const deletedUser = await this.repository.findOne({
       where: { id: id },
       withDeleted: true
    });
    return deletedUser;
  }
}
