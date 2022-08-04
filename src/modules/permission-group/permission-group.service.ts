import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { QueryPermissionGroupDto } from './dto/query-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PermissionGroup } from './entities/permission-group.entity';

@Injectable()
export class PermissionGroupService {
  constructor(
    @InjectRepository(PermissionGroup)
    private readonly permissionGroupRepository: Repository<PermissionGroup>,
  ) {}

  public async findAll(
    queryPermissionGroupDto: QueryPermissionGroupDto,
  ): Promise<PermissionGroup[]> {
    const resultsPerPage = 10;
    const skip = (queryPermissionGroupDto.page - 1) * resultsPerPage;
    return this.permissionGroupRepository.find({
      relations: {
        module: true,
        permission: true,
        userType: true,
      },
      where: {
        module: {
          id: queryPermissionGroupDto.module,
        },
        permission: {
          id: queryPermissionGroupDto.permission,
        },
        userType: {
          id: queryPermissionGroupDto.type,
        },
      },
      take: resultsPerPage,
      skip,
    });
  }

  public async findById(id: number): Promise<PermissionGroup> {
    return this.permissionGroupRepository.findOne({
      relations: {
        module: true,
        permission: true,
        userType: true,
      },
      where: { id },
    });
  }

  public async create(
    createPermissionGroupDto: CreatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return this.permissionGroupRepository.save(createPermissionGroupDto);
  }

  public async update(
    id: number,
    updatePermissionGroupDto: UpdatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    await this.permissionGroupRepository.update(
      { id },
      updatePermissionGroupDto,
    );

    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const { affected } = await this.permissionGroupRepository.delete({ id });

    return !!affected;
  }
}
