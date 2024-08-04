import { CreateUser, UpdateUser, User } from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class UserClient extends RESTClient<User, CreateUser, UpdateUser> {
  constructor(config: IConfig) {
    super(config, 'users');
  }
}
