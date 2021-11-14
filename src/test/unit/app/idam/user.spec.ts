import { User } from 'idam/user';

describe('authToken', () => {
  let user: User;

  beforeEach(() => {
    user = new User('MOCK_ID',
      'MOCK_EMAIL',
      'MOCK_FORENAME',
      'MOCK_SURNAME',
      ['MOCK_ROLE1', 'MOCK_ROLE2'],
      'MOCK_GROUP',
      'MOCK_BEARER_TOKEN'
    );
  });

  test('should set params correctly in constructor', () => {
    expect(user.id).toBe('MOCK_ID');
    expect(user.email).toBe('MOCK_EMAIL');
    expect(user.forename).toBe('MOCK_FORENAME');
    expect(user.surname).toBe('MOCK_SURNAME');
    expect(user.roles).toEqual(['MOCK_ROLE1', 'MOCK_ROLE2']);
    expect(user.group).toBe('MOCK_GROUP');
    expect(user.bearerToken).toBe('MOCK_BEARER_TOKEN');
  });

  describe('isInRoles', () => {
    test('should return true if input roles are present in userRoles', () => {
      const result = user.isInRoles('MOCK_ROLE1');
      expect(result).toBe(true);
    });

    test('should return true if input roles are present in userRoles', () => {
      const result = user.isInRoles('MOCK_ROLE1', 'MOCK_MISSING_ROLE');
      expect(result).toBe(false);
    });
  });

  describe('getLetterHolderIdList', () => {
    test('should return roles with letter holder id ', () => {
      user.roles = ['letter-holder-1', 'letter-holder', 'letter-holder-loa1']
      const result = user.getLetterHolderIdList();
      expect(result).toEqual(["holder-1"]);
    });
  });
});