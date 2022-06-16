import { YesOrNo } from '../../app/case/definition';

import { applicant2Sequence } from './applicant2Sequence';

describe('applicant2Sequence', () => {
  test('should contain 10 entries in applicant 2 screen sequence', () => {
    expect(applicant2Sequence).toHaveLength(10);

    expect(applicant2Sequence[0].url).toBe('/applicant2/full-name');
    expect(applicant2Sequence[0].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[0].getNextStep({})).toBe('/applicant2/other-names');

    expect(applicant2Sequence[1].url).toBe('/applicant2/other-names');
    expect(applicant2Sequence[1].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[1].getNextStep({})).toBe('/applicant2/dob');

    expect(applicant2Sequence[2].url).toBe('/applicant2/dob');
    expect(applicant2Sequence[2].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[2].getNextStep({})).toBe('/applicant2/occupation');

    expect(applicant2Sequence[3].url).toBe('/applicant2/occupation');
    expect(applicant2Sequence[3].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[3].getNextStep({})).toBe('/task-list');

    expect(applicant2Sequence[4].url).toBe('/applicant2/same-address');
    expect(applicant2Sequence[4].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[4].getNextStep({ applicant2AddressSameAsApplicant1: YesOrNo.YES })).toBe(
      '/applicant2/contact-details'
    );
    expect(applicant2Sequence[4].getNextStep({ applicant2AddressSameAsApplicant1: YesOrNo.NO })).toBe(
      '/applicant2/address/lookup'
    );

    expect(applicant2Sequence[5].url).toBe('/applicant2/address/lookup');
    expect(applicant2Sequence[5].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[5].getNextStep({})).toBe('/applicant2/address/select');

    expect(applicant2Sequence[6].url).toBe('/applicant2/address/select');
    expect(applicant2Sequence[6].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[6].getNextStep({})).toBe('/applicant2/contact-details');

    expect(applicant2Sequence[7].url).toBe('/applicant2/address/manual');
    expect(applicant2Sequence[7].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[7].getNextStep({})).toBe('/applicant2/contact-details');

    expect(applicant2Sequence[8].url).toBe('/applicant2/contact-details');
    expect(applicant2Sequence[8].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[8].getNextStep({})).toBe('/applicant2/language-preference');

    expect(applicant2Sequence[9].url).toBe('/applicant2/language-preference');
    expect(applicant2Sequence[9].showInSection).toBe('aboutApplicant2');
    expect(applicant2Sequence[9].getNextStep({})).toBe('/task-list');
  });
});
