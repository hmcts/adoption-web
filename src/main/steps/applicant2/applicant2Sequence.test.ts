import { YesOrNo } from '../../app/case/definition';

import { applicant2Sequence } from './applicant2Sequence';

describe('applicant2Sequence', () => {
  test('should contain 13 entries in applicant 2 screen sequence', () => {
    expect(applicant2Sequence).toHaveLength(13);
    let incr = 0;
    expect(applicant2Sequence[incr].url).toBe('/applicant2/full-name');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/other-names');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/other-names');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/dob');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/dob');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/occupation');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/occupation');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/extra-support');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/extra-support');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/task-list');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/same-address');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({ applicant2AddressSameAsApplicant1: YesOrNo.YES })).toBe(
      '/applicant2/contact-details'
    );
    expect(applicant2Sequence[incr].getNextStep({ applicant2AddressSameAsApplicant1: YesOrNo.NO })).toBe(
      '/applicant2/address/lookup'
    );

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/address/lookup');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/address/select');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/address/select');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/contact-details');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/address/manual');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/contact-details');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/address/change');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/address/confirm-change');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/address/confirm-change');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/review-pay-submit/check-your-answers');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/contact-details');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/applicant2/language-preference');

    expect(applicant2Sequence[++incr].url).toBe('/applicant2/language-preference');
    expect(applicant2Sequence[incr].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[incr].getNextStep({})).toBe('/task-list');
  });
});
