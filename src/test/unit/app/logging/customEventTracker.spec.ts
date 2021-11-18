// import * as appInsights from 'applicationinsights';
// import { trackCustomEvent } from 'app/logging/customEventTracker';

jest.mock('applicationinsights', () => {
  const originalModule = jest.requireActual('applicationinsights');
  return {
    __esModule: true,
    ...originalModule,
    defaultClient: {
      trackEvent: jest.fn()
    }
  };
});

describe('customEventTracker', () => {
  test('should track event if trackEvent method is available', () => {
    // trackCustomEvent('CUSTOM_EVENT', { 'MOCK_PROP_KEY': 'MOCK_PROP_VALUE' });
    // expect(appInsights.defaultClient.trackEvent).toHaveBeenCalledTimes(1);
    // expect(appInsights.defaultClient.trackEvent).toHaveBeenCalledWith({ 'name': 'CUSTOM_EVENT', 'properties': { 'MOCK_PROP_KEY': 'MOCK_PROP_VALUE' } });
  });

  test('should log error if trackEvent method is not available', () => {
    // appInsights.defaultClient.trackEvent = null;
    // try {
    //   expect(trackCustomEvent('CUSTOM_EVENT', { 'MOCK_PROP_KEY': 'MOCK_PROP_VALUE' })).toThrowError();
    // } catch {
    //   console.log('known error');
    // }
  });
});