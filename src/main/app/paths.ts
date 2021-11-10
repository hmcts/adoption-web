import { RoutablePath } from 'shared/router/routablePath';

export class Paths {
  static readonly homePage = new RoutablePath('/', false)
  static readonly landingPage = new RoutablePath('/landing', false)
  static readonly receiver = new RoutablePath('/receiver', false)
}
