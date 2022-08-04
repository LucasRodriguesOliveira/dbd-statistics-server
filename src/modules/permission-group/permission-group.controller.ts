import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { QueryPermissionGroupDto } from './dto/query-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PermissionGroup } from './entities/permission-group.entity';
import { PermissionGroupService } from './permission-group.service';

@Controller('permission-group')
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  @Get()
  public async findAll(
    @Query() queryPermissionGroupDto: QueryPermissionGroupDto,
  ): Promise<PermissionGroup[]> {
    return this.permissionGroupService.findAll(queryPermissionGroupDto);
  }

  @Get(':id')
  public async findById(@Param('id') id: number): Promise<PermissionGroup> {
    return this.permissionGroupService.findById(id);
  }

  @Post()
  public async create(
    @Body() createPermissionGroupDto: CreatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return this.permissionGroupService.create(createPermissionGroupDto);
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return this.permissionGroupService.update(id, updatePermissionGroupDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<boolean> {
    return this.permissionGroupService.delete(id);
  }
}
