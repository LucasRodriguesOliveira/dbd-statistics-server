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
import { CreateUserTokenTypeDto } from './dto/create-user-token-type.dto';
import { UpdateUserTokenTypeDto } from './dto/update-user-token-type.dto';
import { UserTokenType } from './entities/user-token-type.entity';
import { UserTokenTypeService } from './user-token-type.service';

@Controller('user-token-type')
export class UserTokenTypeController {
  constructor(private readonly userTokenTypeService: UserTokenTypeService) {}

  @Get()
  public async findAll(
    @Query('description') description?: string,
  ): Promise<UserTokenType[]> {
    return this.userTokenTypeService.findAll(description);
  }

  @Get(':id')
  public async findById(@Param('id') id: number): Promise<UserTokenType> {
    return this.userTokenTypeService.findById(id);
  }

  @Post()
  public async create(
    @Body() createUserTokenTypeDto: CreateUserTokenTypeDto,
  ): Promise<UserTokenType> {
    return this.userTokenTypeService.create(createUserTokenTypeDto);
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() updateUserTokenTypeDto: UpdateUserTokenTypeDto,
  ): Promise<UserTokenType> {
    return this.userTokenTypeService.update(id, updateUserTokenTypeDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<boolean> {
    return this.userTokenTypeService.delete(id);
  }
}
