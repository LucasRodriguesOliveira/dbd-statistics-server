import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from '../src/config/env/env.config';
import { TypeOrmPostgreSQLModule } from '../src/modules/typeorm/typeorm.module';
import { PerkTypeModule } from '../src/modules/perk-type/perk-type.module';
import { PerkTypeService } from '../src/modules/perk-type/perk-type.service';
import { PerkType } from '../src/modules/perk-type/enitites/perk-type.entity';

describe('PerkTypeController (e2e)', () => {
  let app: INestApplication;
  const baseURL = '/perk-type';
  const pathTo = ([path]: TemplateStringsArray, computedPath?: string) =>
    `${baseURL}/${path}${computedPath || ''}`;
  let perkType: PerkType;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(envConfig),
        TypeOrmPostgreSQLModule,
        PerkTypeModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const perkTypeService = app.get<PerkTypeService>(PerkTypeService);
    perkType = await perkTypeService.create('teste');
  });

  afterEach(async () => {
    const perkTypeService = app.get<PerkTypeService>(PerkTypeService);
    if (perkType) {
      await perkTypeService.delete(perkType.id);
    }
  });

  describe('GET', () => {
    it('/', () => {
      return request(app.getHttpServer())
        .get(pathTo``)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveLength(1);
        });
    });

    it('/:id', () => {
      return request(app.getHttpServer())
        .get(pathTo`${perkType.id.toString()}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toStrictEqual(perkType);
        });
    });
  });

  describe('POST', () => {
    const description = 'test description';

    it('/', () => {
      return request(app.getHttpServer())
        .post(pathTo``)
        .send({ description })
        .expect(201)
        .expect(({ body }) => {
          expect(body.description).toBe(description);
        });
    });
  });

  describe('PUT', () => {
    const description = 'new description';

    it('/:id', () => {
      return request(app.getHttpServer())
        .put(pathTo`${perkType.id.toString()}`)
        .send({ description })
        .expect(200)
        .expect(({ body }) => {
          expect(body.description).toBe(description);
          expect(body.id).toBe(perkType.id);
        });
    });
  });

  describe('DELETE', () => {
    it('/:id', () => {
      return request(app.getHttpServer())
        .delete(pathTo`${perkType.id.toString()}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toBeTruthy();
        });
    });
  });
});
