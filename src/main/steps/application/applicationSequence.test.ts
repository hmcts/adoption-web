import { applicationSequence } from './applicationSequence';

describe('applicationSequence', () => {
  test('should contain 12 entries in applicant 1 screen sequence', () => {
    expect(applicationSequence).toHaveLength(13);

    expect(applicationSequence[0].url).toBe('/');
    expect(applicationSequence[0].getNextStep({})).toBe('/');

    expect(applicationSequence[1].url).toBe('/start-placement');
    expect(applicationSequence[1].getNextStep({})).toBe('/task-list');

    expect(applicationSequence[2].url).toBe('/applying-with');
    expect(applicationSequence[2].getNextStep({})).toBe('/task-list');

    expect(applicationSequence[3].url).toBe('/application/submitted');
    expect(applicationSequence[3].getNextStep({})).toBe('/application/submitted');

    expect(applicationSequence[4].url).toBe('/cookies');
    expect(applicationSequence[4].getNextStep({})).toBe('/');

    expect(applicationSequence[5].url).toBe('/privacy-policy');
    expect(applicationSequence[5].getNextStep({})).toBe('/');

    expect(applicationSequence[6].url).toBe('/accessibility-statement');
    expect(applicationSequence[6].getNextStep({})).toBe('/');

    expect(applicationSequence[7].url).toBe('/terms-and-conditions');
    expect(applicationSequence[7].getNextStep({})).toBe('/');

    expect(applicationSequence[8].url).toBe('/contact-us');
    expect(applicationSequence[8].getNextStep({})).toBe('/');

    expect(applicationSequence[9].url).toBe('/task-list');
    expect(applicationSequence[9].getNextStep({})).toBe('/');

    expect(applicationSequence[10].url).toBe('/save-and-sign-out');
    expect(applicationSequence[10].getNextStep({})).toBe('/login');

    expect(applicationSequence[11].url).toBe('/timed-out');
    expect(applicationSequence[11].getNextStep({})).toBe('/login');

    expect(applicationSequence[12].url).toBe('/save-as-draft');
    expect(applicationSequence[12].getNextStep({})).toBe('/task-list');
  });
});
