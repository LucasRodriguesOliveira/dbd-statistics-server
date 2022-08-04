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
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { UserType } from './entities/user-type.entity';
import { UserTypeService } from './user-type.service';

@Controller('user-type')
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Get()
  public async findAll(
    @Query('description') description?: string,
  ): Promise<UserType[]> {
    return this.userTypeService.findAll(description);
  }

  @Get(':id')
  public async findById(@Param('id') id: number): Promise<UserType> {
    return this.userTypeService.findById(id);
  }

  @Post()
  public async create(
    @Body() createUserTypeDto: CreateUserTypeDto,
  ): Promise<UserType> {
    return this.userTypeService.create(createUserTypeDto);
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() updateUserTypeDto: UpdateUserTypeDto,
  ): Promise<UserType> {
    return this.userTypeService.update(id, updateUserTypeDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<boolean> {
    return this.userTypeService.delete(id);
  }
}
