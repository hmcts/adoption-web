import { Paths } from 'paths';

describe('paths', () => {
  test('should contain home page path', () => {
    expect(Paths.homePage).toBeDefined();
    expect(Paths.homePage.uri).toBe('/');
  });

  test('should contain landing page path', () => {
    expect(Paths.landingPage).toBeDefined();
    expect(Paths.landingPage.uri).toBe('/landing');
  });

  test('should contain receiver page path', () => {
    expect(Paths.receiver).toBeDefined();
    expect(Paths.receiver.uri).toBe('/receiver');
  });
});
