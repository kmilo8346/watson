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

import {
  CreateManyTweets,
  CreateTweet,
  SearchTweetsParams,
  UpdateTweet,
} from '@watson/models';
import { TweetsService } from './service';

@Controller('/v1/tweets')
export class TweetsController {
  constructor(private readonly service: TweetsService) {}

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Get('/')
  getAll(@Query() searchParams: SearchTweetsParams) {
    return this.service.getAll(searchParams);
  }

  @Post('/')
  async create(@Body() createTweets: CreateTweet) {
    return this.service.create(createTweets);
  }

  @Post('/many')
  createMany(@Body() createManyTweets: CreateManyTweets) {
    return this.service.createMany(createManyTweets.data);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateTweet: UpdateTweet) {
    return this.service.update(id, updateTweet);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
