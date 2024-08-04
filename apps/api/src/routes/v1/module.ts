import { Module } from '@nestjs/common';

import { AuthModule } from './auth/module';
import { UsersModule } from './users/module';
import { DataSourcesModule } from './data-sources/module';
import { TweetsModule } from './tweets/module';
import { FiltersModule } from './filters/module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DataSourcesModule,
    TweetsModule,
    FiltersModule,
  ],
  controllers: [],
  providers: [],
})
export class V1Module {}
