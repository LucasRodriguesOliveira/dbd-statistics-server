import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../../../../test/utils/repository-mock.factory';
import { MockType } from '../../../../test/utils/mock-type';
import { UserTokenType } from '../entities/user-token-type.entity';
import { UserTokenTypeService } from '../user-token-type.service';
import { UserTokenTypeController } from '../user-token-type.controller';

describe('UserTokenTypeController', () => {
  let userTokenTypeController: UserTokenTypeController;
  let userTokenTypeService: UserTokenTypeService;
  let userTokenTypeRepository: MockType<Repository<UserTokenType>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserTokenTypeController],
      providers: [
        UserTokenTypeService,
        {
          provide: getRepositoryToken(UserTokenType),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    userTokenTypeController = moduleRef.get<UserTokenTypeController>(
      UserTokenTypeController,
    );
    userTokenTypeService =
      moduleRef.get<UserTokenTypeService>(UserTokenTypeService);
    userTokenTypeRepository = moduleRef.get<
      MockType<Repository<UserTokenType>>
    >(getRepositoryToken(UserTokenType));
  });

  it('should be defined', () => {
    expect(userTokenTypeController).toBeDefined();
    expect(userTokenTypeService).toBeDefined();
    expect(userTokenTypeRepository).toBeDefined();
  });

  describe('Read', () => {
    const userTokenType: UserTokenType = {
      id: 0,
      description: 'test',
    };

    const userTokenTypeList: UserTokenType[] = [
      userTokenType,
      {
        id: 1,
        description: 'test 1',
      },
    ];

    beforeEach(() => {
      userTokenTypeRepository.findBy.mockReturnValueOnce(userTokenTypeList);
      userTokenTypeRepository.findOneBy.mockReturnValueOnce(userTokenType);
    });

    it('should read all the user token types', async () => {
      const result = await userTokenTypeController.findAll();

      expect(result).toBe(userTokenTypeList);
      expect(userTokenTypeRepository.findBy).toHaveBeenCalled();
    });

    it('should find a user token type by its id', async () => {
      const result = await userTokenTypeController.findById(userTokenType.id);

      expect(result).toBe(userTokenType);
      expect(userTokenTypeRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('Create', () => {
    const userTokenType: UserTokenType = {
      id: 0,
      description: 'test',
    };

    beforeEach(() => {
      userTokenTypeRepository.save.mockReturnValueOnce(userTokenType);
    });

    it('should create a new user token type', async () => {
      const result = await userTokenTypeController.create({
        description: userTokenType.description,
      });

      expect(result).toBe(userTokenType);
      expect(userTokenTypeRepository.save).toHaveBeenCalled();
    });
  });

  describe('Update', () => {
    const userTokenType: UserTokenType = {
      id: 0,
      description: 'new description',
    };

    beforeEach(() => {
      userTokenTypeRepository.findOneBy.mockReturnValueOnce(userTokenType);
    });

    it('should update a user token type description', async () => {
      const result = await userTokenTypeController.update(userTokenType.id, {
        description: userTokenType.description,
      });

      expect(result).toBe(userTokenType);
      expect(userTokenTypeRepository.update).toHaveBeenCalledWith(
        { id: userTokenType.id },
        { description: userTokenType.description },
      );
    });
  });

  describe('Delete', () => {
    const id = 0;

    beforeEach(() => {
      userTokenTypeRepository.delete.mockReturnValueOnce({
        raw: [],
        affected: 1,
      });
    });

    it('should delete a user token type by its id', async () => {
      const result = await userTokenTypeController.delete(id);

      expect(result).toBeTruthy();
      expect(userTokenTypeRepository.delete).toHaveBeenCalled();
    });
  });
});
