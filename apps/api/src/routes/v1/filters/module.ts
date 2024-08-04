import { Module } from '@nestjs/common';

import { FiltersController } from './controller';
import { FiltersService } from './service';

@Module({
  imports: [],
  controllers: [FiltersController],
  providers: [FiltersService],
})
export class FiltersModule {}
