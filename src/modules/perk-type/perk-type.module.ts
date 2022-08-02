import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerkTypeController } from './perk-type.controller';
import { PerkType } from './enitites/perk-type.entity';
import { PerkTypeService } from './perk-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([PerkType])],
  controllers: [PerkTypeController],
  providers: [PerkTypeService],
})
export class PerkTypeModule {}
