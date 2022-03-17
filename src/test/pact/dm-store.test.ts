import { getMeDogs } from '..';

const { pactWith } = require('jest-pact');

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'dm-store',
  },
  provider => {
    describe('dm-store API', () => {
      const DOGS_DATA = [
        {
          dog: 1,
        },
      ];

      const dogsSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: DOGS_DATA,
      };

      const dogsListRequest = {
        uponReceiving: 'a request for dogs',
        withRequest: {
          method: 'GET',
          path: '/dogs',
          headers: {
            Accept: 'application/json',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'i have a list of dogs',
          ...dogsListRequest,
          willRespondWith: dogsSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      // add expectations
      it('returns a successful body', () => {
        return getMeDogs({
          url: provider.mockService.baseUrl,
        }).then(dogs => {
          expect(dogs).toEqual(DOGS_DATA);
        });
      });
    });
  }
);
