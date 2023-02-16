import { applicant1Sequence } from './applicant1Sequence';

describe('applicant1Sequence', () => {
  test('should contain 14 entries in applicant 1 screen sequence', () => {
    expect(applicant1Sequence).toHaveLength(14);
    let incr = 0;
    expect(applicant1Sequence[incr].url).toBe('/date-child-moved-in');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/task-list');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/full-name');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/other-names');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/other-names');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/dob');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/dob');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/occupation');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/occupation');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/extra-support');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/extra-support');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/task-list');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/address/lookup');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/address/select');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/address/select');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/contact-details');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/address/manual');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/contact-details');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/address/change');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/address/confirm-change');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/address/confirm-change');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/review-pay-submit/check-your-answers');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/contact-details');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/applicant1/language-preference');

    expect(applicant1Sequence[++incr].url).toBe('/applicant1/language-preference');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/task-list');

    expect(applicant1Sequence[++incr].url).toBe('/upload-your-documents');
    expect(applicant1Sequence[incr].showInSection).toBe('aboutApplicant1');
    expect(applicant1Sequence[incr].getNextStep({})).toBe('/task-list');
  });
});
