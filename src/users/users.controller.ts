import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException(
        `Email address '${createUserDto.email}' already registered.`,
      );
    }
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id '${id}' is not found.`);
    }
    if (user.deleted_at != null) {
      throw new NotFoundException(`User with id '${id}' has been deleted.`);
    }

    if (JSON.stringify(updateUserDto) === '{}') {
      throw new BadRequestException('Empty request body provided.');
    }

    await this.usersService.update(id, updateUserDto);
    return await this.usersService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user || user.deleted_at != null) {
      throw new NotFoundException();
    }

    const response = await this.usersService.remove(id);
    if (!response.affected) {
      throw new NotFoundException();
    }

    return await this.usersService.findById(id);
  }
}
