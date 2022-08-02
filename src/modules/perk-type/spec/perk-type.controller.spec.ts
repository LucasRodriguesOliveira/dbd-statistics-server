import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from '../../../../test/utils/mock-type';
import { repositoryMockFactory } from '../../../../test/utils/repository-mock.factory';
import { Repository } from 'typeorm';
import { PerkTypeController } from '../perk-type.controller';
import { PerkType } from '../enitites/perk-type.entity';
import { PerkTypeService } from '../perk-type.service';

describe('PerkTypeController', () => {
  let perkTypeController: PerkTypeController;
  let perkTypeService: PerkTypeService;
  let perkTypeRepository: MockType<Repository<PerkType>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PerkTypeController],
      providers: [
        PerkTypeService,
        {
          provide: getRepositoryToken(PerkType),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    perkTypeController = moduleRef.get<PerkTypeController>(PerkTypeController);
    perkTypeService = moduleRef.get<PerkTypeService>(PerkTypeService);
    perkTypeRepository = moduleRef.get<MockType<Repository<PerkType>>>(
      getRepositoryToken(PerkType),
    );
  });

  it('should be defined', () => {
    expect(perkTypeRepository).toBeDefined();
    expect(perkTypeService).toBeDefined();
    expect(perkTypeController).toBeDefined();
  });

  describe('Read', () => {
    const perkTypeListMock: PerkType[] = [
      {
        id: 0,
        description: 'test 1',
      },
      {
        id: 1,
        description: 'test 2',
      },
    ];

    const perkTypeMock: PerkType = {
      id: 2,
      description: 'test 3',
    };

    beforeEach(() => {
      perkTypeRepository.findBy.mockReturnValueOnce(perkTypeListMock);
      perkTypeRepository.findOneBy.mockReturnValueOnce(perkTypeMock);
    });

    it('should get all perk types', async () => {
      const result = await perkTypeController.list();

      expect(result).toBe(perkTypeListMock);
      expect(perkTypeRepository.findBy).toHaveBeenCalled();
    });

    it('should get one perk type by id', async () => {
      const id = 0;

      const result = await perkTypeController.find(id);

      expect(result).toBe(perkTypeMock);
      expect(perkTypeRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('Create', () => {
    const perkType: PerkType = {
      id: 0,
      description: 'test',
    };
    const description = 'test';

    beforeEach(() => {
      perkTypeRepository.save.mockReturnValueOnce(perkType);
    });

    it('creates a Perk Type successfully', async () => {
      const result = await perkTypeController.create(description);

      expect(result).toBe(perkType);
      expect(perkTypeRepository.save).toHaveBeenCalled();
    });
  });

  describe('Update', () => {
    const perkType: PerkType = {
      id: 0,
      description: 'new description',
    };
    const description = 'new description';
    const id = 0;

    beforeEach(() => {
      perkTypeRepository.update.mockReturnValueOnce(perkType);
      perkTypeRepository.findOneBy.mockReturnValueOnce(perkType);
    });

    it('updates successfully a perk type description', async () => {
      const result = await perkTypeController.updateDescription(
        id,
        description,
      );

      expect(result).toBe(perkType);
      expect(perkTypeRepository.update).toHaveBeenCalled();
      expect(perkTypeRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('Delete', () => {
    const id = 0;

    beforeEach(() => {
      perkTypeRepository.delete.mockReturnValueOnce({ raw: [], affected: 1 });
    });

    it("deletes successfully a perk type by it' id", async () => {
      const result = await perkTypeController.delete(id);

      expect(result).toBeTruthy();
      expect(perkTypeRepository.delete).toHaveBeenCalled();
    });
  });
});
