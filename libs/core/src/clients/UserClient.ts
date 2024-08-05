import {
  CreateUser,
  SearchUsersParams,
  UpdateUser,
  User,
} from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class UserClient extends RESTClient<
  User,
  CreateUser,
  UpdateUser,
  SearchUsersParams
> {
  constructor(config: IConfig) {
    super(config, 'users');
  }
}
