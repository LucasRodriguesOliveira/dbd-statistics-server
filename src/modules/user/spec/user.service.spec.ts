import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType } from '../../../../test/utils/mock-type';
import { repositoryMockFactory } from '../../../../test/utils/repository-mock.factory';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockType<Repository<User>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<MockType<Repository<User>>>(
      getRepositoryToken(User),
    );
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Reads successfully users', () => {
    const user = {
      id: 0,
      name: 'test',
      email: 'teste@teste.com',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const userList: User[] = [
      user,
      {
        id: 1,
        name: 'test',
        email: 'teste@teste.com',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    beforeEach(() => {
      userRepository.findBy.mockReturnValueOnce(userList);
      userRepository.findOneBy.mockReturnValueOnce(user);
    });

    it('should return a list of users', async () => {
      const result = await userService.findAll();

      expect(result).toHaveLength(2);
      expect(result).toBe(userList);
      expect(userRepository.findBy).toHaveBeenCalled();
    });

    it('should return a user', async () => {
      const result = await userService.findById(user.id);

      expect(result.id).toBe(user.id);
      expect(result).toBe(user);
      expect(userRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      name: 'test',
      email: 'test@test.com',
      password: '123',
    };
    const user: User = {
      id: 0,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    beforeEach(() => {
      userRepository.save.mockReturnValueOnce(user);
    });

    it('should create a new user and return it', async () => {
      const result = await userService.create(createUserDto);

      expect(result).toBe(user);
      expect(userRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const updateUserDto: UpdateUserDto = {
      email: 'newTest@test.com',
    };

    const user: User = {
      id: 0,
      name: 'test',
      email: updateUserDto.email,
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    beforeEach(() => {
      userRepository.update.mockReturnValueOnce(user);
      userRepository.findOneBy.mockReturnValueOnce(user);
    });

    it('should update a user email', async () => {
      const result = await userService.update(user.id, updateUserDto);

      expect(result).toBe(user);
      expect(userRepository.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    const id = 0;

    beforeEach(() => {
      userRepository.delete.mockReturnValueOnce({ raw: [], affected: 1 });
    });

    it('should delete a user', async () => {
      const result = await userService.delete(id);

      expect(result).toBeTruthy();
      expect(userRepository.delete).toHaveBeenCalled();
    });
  });
});
