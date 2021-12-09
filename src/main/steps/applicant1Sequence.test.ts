import { applicant1Sequence } from './applicant1Sequence';

describe('applicant1Sequence', () => {
  test('should contain 6 entries in applicant 1 screen sequence', () => {
    expect(applicant1Sequence).toHaveLength(8);

    expect(applicant1Sequence[0].url).toBe('/applying-with');
    expect(applicant1Sequence[0].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[0].getNextStep({})).toBe('/task-list');

    expect(applicant1Sequence[1].url).toBe('/date-child-moved-in');
    expect(applicant1Sequence[1].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[1].getNextStep({})).toBe('/applicant1/personal-details');

    expect(applicant1Sequence[2].url).toBe('/applicant1/personal-details');
    expect(applicant1Sequence[2].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[2].getNextStep({})).toBe('/applicant1/contact-details');

    expect(applicant1Sequence[3].url).toBe('/applicant1/contact-details');
    expect(applicant1Sequence[3].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[3].getNextStep({})).toBe('/applicant1/identity-documents');

    expect(applicant1Sequence[4].url).toBe('/applicant1/identity-documents');
    expect(applicant1Sequence[4].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[4].getNextStep({})).toBe('/task-list');

    expect(applicant1Sequence[5].url).toBe('/applicant1/find-address');
    expect(applicant1Sequence[5].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[5].getNextStep({})).toBe('/applicant1/select-address');

    expect(applicant1Sequence[6].url).toBe('/applicant1/select-address');
    expect(applicant1Sequence[6].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[6].getNextStep({})).toBe('/task-list');

    expect(applicant1Sequence[7].url).toBe('/applicant1/manual-address');
    expect(applicant1Sequence[7].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[7].getNextStep({})).toBe('/task-list');
  });
});
