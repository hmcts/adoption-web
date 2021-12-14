import { applicant2Sequence } from './applicant2Sequence';

describe('applicant2Sequence', () => {
  test('should contain 4 entries in applicant 2 screen sequence', () => {
    expect(applicant2Sequence).toHaveLength(4);

    expect(applicant2Sequence[0].url).toBe('/applicant2/find-address');
    expect(applicant2Sequence[0].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[0].getNextStep({})).toBe('/applicant2/select-address');

    expect(applicant2Sequence[1].url).toBe('/applicant2/select-address');
    expect(applicant2Sequence[1].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[1].getNextStep({})).toBe('/applicant2/contact-details');

    expect(applicant2Sequence[2].url).toBe('/applicant2/manual-address');
    expect(applicant2Sequence[2].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[2].getNextStep({})).toBe('/applicant2/contact-details');

    expect(applicant2Sequence[3].url).toBe('/applicant2/contact-details');
    expect(applicant2Sequence[3].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[3].getNextStep({})).toBe('/task-list');
  });
});
