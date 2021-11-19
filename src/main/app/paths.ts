import { RoutablePath } from 'common/router/routablePath';

export class Paths {
  static readonly homePage = new RoutablePath('/', false)
  static readonly receiver = new RoutablePath('/receiver', false)
  static readonly logoutReceiver = new RoutablePath('/logout')  
}
