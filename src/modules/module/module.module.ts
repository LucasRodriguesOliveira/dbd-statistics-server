import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ModuleEntity from './entities/module.entity';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity.Module])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
