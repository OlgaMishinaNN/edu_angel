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
  Query,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QueryDto } from './dto/query.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Users API')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiExtraModels(CreateUserDto)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: UserDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
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
  @ApiOperation({ summary: 'Gets the list of all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [UserDto],
  })
  @ApiExtraModels(QueryDto)
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: QueryDto,
  ) {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gets the user by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id '${id}' is not found.`);
    }
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates the user data' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the user',
  })
  @ApiExtraModels(UpdateUserDto)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
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

    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removes the user by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The id of the user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user || user.deleted_at != null) {
      throw new NotFoundException();
    }

    return await this.usersService.remove(id);
  }
}
