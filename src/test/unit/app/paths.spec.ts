import { Paths } from 'app/paths';

describe('paths', () => {
  test('should contain home page path', () => {
    expect(Paths.homePage).toBeDefined();
    expect(Paths.homePage.uri).toBe('/');
  });

  test('should contain receiver page path', () => {
    expect(Paths.receiver).toBeDefined();
    expect(Paths.receiver.uri).toBe('/receiver');
  });
});
