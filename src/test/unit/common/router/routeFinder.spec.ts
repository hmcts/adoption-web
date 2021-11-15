import * as path from 'path';
import { RouterFinder } from 'shared/router/routerFinder';

describe('RouterFinder', () => {
  test('should find all routes in a given path', () => {
    expect(RouterFinder.findAll(path.join(__dirname, '../../../../main/routes'))).toBeInstanceOf(Array);
  });
});