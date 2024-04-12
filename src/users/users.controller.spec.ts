import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { QueryDto } from './dto/query.dto';
import { SortParam, SortOrder } from './enums/sort.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

const user = {
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  created_at: faker.date.anytime(),
  deleted_at: undefined,
};

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();

    const createUserDto = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    } as CreateUserDto;

    const user = {
      id: faker.string.uuid(),
      first_name: firstName,
      last_name: lastName,
      email: email,
      created_at: faker.date.anytime(),
      deleted_at: undefined,
    } as User;

    jest.spyOn(mockUsersService, 'create').mockReturnValue(user);

    const result = await controller.create(createUserDto);

    expect(mockUsersService.create).toHaveBeenCalled();
    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('findAll => should return an array of user', async () => {
    const queryDto = {
      limit: faker.number.int({ min: 1, max: 100 }),
      offset: faker.number.int({ min: 0 }),
      sort: SortParam.Id,
      order: SortOrder.Asc,
      showDeleted: true,
    } as QueryDto;

    const users = [user];
    jest.spyOn(mockUsersService, 'findAll').mockReturnValue(users);

    const result = await controller.findAll(queryDto);

    expect(result).toEqual(users);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('findOne => should find a user by a given id and return its data', async () => {
    const id = faker.string.uuid();
    const user = {
      id: id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    };

    jest.spyOn(mockUsersService, 'findById').mockReturnValue(user);

    const result = await controller.findOne(id);

    expect(result).toEqual(user);
    expect(mockUsersService.findById).toHaveBeenCalled();
    expect(mockUsersService.findById).toHaveBeenCalledWith(id);
  });

  it('update => should find a user by a given id and update its data', async () => {
    const id = faker.string.uuid();
    const lastName = faker.person.lastName();
    const updateUserDto = {
      lastName: lastName,
    } as UpdateUserDto;

    const user = {
      id: id,
      firstName: faker.person.firstName(),
      lastName: lastName,
      email: faker.internet.email(),
      createdAt: faker.date.anytime(),
      deletedAt: undefined,
    } as UserDto;

    jest.spyOn(mockUsersService, 'update').mockReturnValue(user);

    const result = await controller.update(id, updateUserDto);

    expect(mockUsersService.update).toHaveBeenCalled();
    expect(mockUsersService.update).toHaveBeenCalledWith(id, updateUserDto);

    expect(result).toEqual(user);
  });

  it('remove => should find a user by a given id and remove it', async () => {
    const id = faker.string.uuid();
    const user = {
      id: id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    };

    jest.spyOn(mockUsersService, 'remove').mockReturnValue(user);

    const result = await controller.remove(id);

    expect(result).toEqual(user);
    expect(mockUsersService.remove).toHaveBeenCalled();
    expect(mockUsersService.remove).toHaveBeenCalledWith(id);
  });
});
