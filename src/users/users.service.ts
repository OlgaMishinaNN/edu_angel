import { Injectable, NotFoundException, HttpStatus, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const user = await this.repository
      .createQueryBuilder("user")
      .where("user.id= :id", { id: id })
      .getOne()

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
