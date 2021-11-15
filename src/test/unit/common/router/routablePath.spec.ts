import { RoutablePath } from 'shared/router/routablePath';

describe('RoutablePath', () => {
  describe('providing uri', () => {
    test('should throw error if uri is missing', () => {
      expect(() => new RoutablePath(null))
        .toThrow(Error('URI is missing'));
    });
    test('should strip index from the end of the uri', () => {
      expect(new RoutablePath('/response/index').uri).toBe('/response');
    });
    test('should not strip index from the middle of the uri', () => {
      expect(new RoutablePath('/response/index-type').uri).toBe('/response/index-type');
    });
  });

  describe('evaluating uri', () => {
    test('should fail when substitutions is not provided', () => {
      [undefined, {}].forEach(invalidValue => {
        expect(() => new RoutablePath('/case/:externalId/payment/:payment-type').evaluateUri(invalidValue))
          .toThrow(Error('Path parameter substitutions are required'));
      });
    });

    test('should fail when not all path parameter placeholders has been replaced', () => {
      expect(() => new RoutablePath('/case/:id/payment/:payment-type').evaluateUri({ id: '999' }))
        .toThrow(Error('Path parameter substitutions for :payment-type are missing'));
    });

    test('should fail when not all path parameter substitutions has been used', () => {
      expect(() => new RoutablePath('/case/:id').evaluateUri({ id: '999', foo: 'bar' }))
        .toThrow(Error('Path parameter :foo is not defined'));
    });

    test('should replace all path parameter placeholders', () => {
      expect(new RoutablePath('/case/:id/payment/:payment-type').evaluateUri({ id: '999', 'payment-type': 'card' }))
        .toBe('/case/999/payment/card');
    });

    test('should fail when path parameter placeholder has invalid value', () => {
      [{ id: undefined }, { id: null }, { id: 'null' }, { id: 'undefined' }, { id: '' }].forEach(invalidValue => {
        expect(() => new RoutablePath('/case/:id/payment').evaluateUri(invalidValue))
          .toThrow(Error('Path parameter :id is invalid'));
      });
    });
  });

  describe('finding associated view', () => {
    describe('for features', () => {
      test('should return path within feature directory structure', () => {
        expect(new RoutablePath('/response/response-type').associatedView).toBe('response/views/response-type');
        expect(new RoutablePath('/response/free-mediation/warning').associatedView).toBe('response/views/free-mediation/warning');
      });

      test('should strip any path parameters', () => {
        expect(new RoutablePath('/claim/:externalId/confirmation').associatedView).toBe('claim/views/confirmation');
        expect(new RoutablePath('/claim/:type/:subtype/list').associatedView).toBe('claim/views/list');
      });

      test('should remove case from view path', () => {
        expect(new RoutablePath('/case/:externalId/claim/confirmation').associatedView).toBe('claim/views/confirmation');
      });
    });

    describe('for others', () => {
      test('should return path within main directory structure', () => {
        expect(new RoutablePath('/claim/start', false).associatedView).toBe('claim/start');
        expect(new RoutablePath('/claim/defendant/name', false).associatedView).toBe('claim/defendant/name');
      });

      test('should strip any path parameters', () => {
        expect(new RoutablePath('/claim/:externalId/confirmation', false).associatedView).toBe('claim/confirmation');
        expect(new RoutablePath('/claim/:type/:subtype/list', false).associatedView).toBe('claim/list');
      });
    });
  });

});
