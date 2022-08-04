import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  public async findAll(description?: string): Promise<Permission[]> {
    const where = {
      description: Like(`${description || ''}%`),
    };

    return this.permissionRepository.findBy(where);
  }

  public async findById(id: number): Promise<Permission> {
    return this.permissionRepository.findOneBy({ id });
  }

  public async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionRepository.create(createPermissionDto);
  }

  public async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    await this.permissionRepository.update({ id }, updatePermissionDto);

    return this.permissionRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<boolean> {
    const { affected } = await this.permissionRepository.delete({ id });

    return !!affected;
  }
}
