import { IJwtPayload, IJwtToken } from '@watson/models';
import { jwtDecode } from 'jwt-decode';
import Bootable from './Bootable';
import { streamer } from './EventStreamer';

const AUTH_KEY = '@AUTH';

interface IState {
  auth: IJwtToken;
  user: IJwtPayload;
}

class Authenticator extends Bootable {
  private state: IState | null;

  constructor() {
    super();
    this.state = null;
  }

  async boot(): Promise<void> {
    const auth = this.getAuthFromStorage();
    if (auth !== null) {
      const user = jwtDecode<IJwtPayload>(auth.access_token);
      this.state = { auth, user };
    }
  }

  getAuthFromStorage(): IJwtToken | null {
    const value = localStorage.getItem(AUTH_KEY);
    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  }

  signIn(auth: IJwtToken) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));

    const user = jwtDecode<IJwtPayload>(auth.access_token);

    this.state = {
      auth,
      user,
    };

    streamer.emit('USER:LOGGED_IN', user);
  }

  signOut() {
    localStorage.removeItem(AUTH_KEY);

    this.state = null;

    streamer.emit('USER:LOGGED_OUT');
  }

  isAuthenticated(): boolean {
    return this.state !== null;
  }

  getUserInfo(): IJwtPayload {
    if (this.state === null) {
      throw new Error('User is not authenticated');
    }

    return this.state.user;
  }
}

export const authenticator = new Authenticator();
