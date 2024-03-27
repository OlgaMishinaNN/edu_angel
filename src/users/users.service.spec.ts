import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { faker } from '@faker-js/faker';
import { QueryDto } from './dto/query.dto';
import { SortOrder, SortParam } from './enums/sort.enum';

const user = {
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  created_at: faker.date.anytime(),
  deleted_at: undefined,
};

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    findAll: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      orderBy: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      withDeleted: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([user]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
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

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    const result = await service.create(createUserDto);

    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(createUserDto);

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
    jest
      .spyOn(mockUserRepository.createQueryBuilder(), 'getMany')
      .mockResolvedValue([user]);

    const result = await service.findAll(queryDto);

    expect(result).toEqual(users);
    expect(mockUserRepository.createQueryBuilder).toHaveBeenCalled();
  });

  it('remove => should find a user by a given id and remove it', async () => {
    const id = faker.string.uuid();
    const user = {
      id: id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    };

    jest.spyOn(mockUserRepository, 'softDelete').mockReturnValue(user);

    const result = await service.remove(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.softDelete).toHaveBeenCalled();
    expect(mockUserRepository.softDelete).toHaveBeenCalledWith(id);
  });

  it('findById => should find a user by a given id and return its data', async () => {
    const id = faker.string.uuid();
    const withDeleted = true;
    const user = {
      id: id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    };

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    const result = await service.findById(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { id: id },
      withDeleted,
    });
  });

  it('findByEmail => should find a user by a given email and return its data', async () => {
    const email = faker.internet.email();
    const withDeleted = true;
    const user = {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: email,
    };

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);

    const result = await service.findByEmail(email);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: email },
      withDeleted,
    });
  });

  it('update => Should update user data and return it', async () => {
    const id = faker.string.uuid();
    const lastName = faker.person.lastName();
    const updateUserDto = {
      lastName: lastName,
    } as UpdateUserDto;

    const user = {
      id: id,
      first_name: faker.person.firstName(),
      last_name: lastName,
      email: faker.internet.email(),
      created_at: faker.date.anytime(),
      deleted_at: undefined,
    } as User;

    jest.spyOn(mockUserRepository, 'update').mockReturnValue(user);

    const result = await service.update(id, updateUserDto);

    expect(mockUserRepository.update).toHaveBeenCalled();
    expect(mockUserRepository.update).toHaveBeenCalledWith(id, updateUserDto);

    expect(result).toEqual(user);
  });
});
