import { Credentials } from '@watson/models';
import { IConfig, RESTClient } from './RESTClient';

export class AuthClient extends RESTClient<any, any, any, any> {
  constructor(config: IConfig) {
    super(config, 'auth');
  }

  async login(credentials: Credentials) {
    const response = await this.axios.post(
      `/${this.collection}/login`,
      credentials
    );
    return response.data;
  }
}
