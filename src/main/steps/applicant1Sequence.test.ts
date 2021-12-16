import { Sections, applicant1Sequence } from './applicant1Sequence';
import {
  APPLICANT_1_CONTACT_DETAILS,
  APPLICANT_1_DOB,
  APPLICANT_1_FIND_ADDRESS,
  APPLICANT_1_FULL_NAME,
  APPLICANT_1_IDENTITY_DOCUMENTS,
  APPLICANT_1_MANUAL_ADDRESS,
  APPLICANT_1_NATIONALITY,
  APPLICANT_1_OCCUPATION,
  APPLICANT_1_OTHER_NAMES,
  APPLICANT_1_SELECT_ADDRESS,
  APPLYING_WITH_URL,
  DATE_CHILD_MOVED_IN_URL,
  FEE_LOOKUP_URL,
  TASK_LIST_URL,
} from './urls';

describe('applicant1Sequence', () => {
  test('should contain 13 entries in applicant 1 screen sequence', () => {
    expect(applicant1Sequence).toHaveLength(13);

    expect(applicant1Sequence[0].url).toBe(APPLYING_WITH_URL);
    expect(applicant1Sequence[0].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[0].getNextStep({})).toBe(TASK_LIST_URL);

    expect(applicant1Sequence[1].url).toBe(DATE_CHILD_MOVED_IN_URL);
    expect(applicant1Sequence[1].showInSection).toBe(Sections.AboutPartnership);
    expect(applicant1Sequence[1].getNextStep({})).toBe(APPLICANT_1_FULL_NAME);

    expect(applicant1Sequence[2].url).toBe(APPLICANT_1_FULL_NAME);
    expect(applicant1Sequence[2].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[2].getNextStep({})).toBe(APPLICANT_1_OTHER_NAMES);

    expect(applicant1Sequence[3].url).toBe(APPLICANT_1_OTHER_NAMES);
    expect(applicant1Sequence[3].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[3].getNextStep({})).toBe(APPLICANT_1_DOB);

    expect(applicant1Sequence[4].url).toBe(APPLICANT_1_DOB);
    expect(applicant1Sequence[4].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[4].getNextStep({})).toBe(APPLICANT_1_NATIONALITY);

    expect(applicant1Sequence[5].url).toBe(APPLICANT_1_NATIONALITY);
    expect(applicant1Sequence[5].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[5].getNextStep({})).toBe(APPLICANT_1_OCCUPATION);

    expect(applicant1Sequence[6].url).toBe(APPLICANT_1_OCCUPATION);
    expect(applicant1Sequence[6].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[6].getNextStep({})).toBe(TASK_LIST_URL);

    expect(applicant1Sequence[7].url).toBe(APPLICANT_1_CONTACT_DETAILS);
    expect(applicant1Sequence[7].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[7].getNextStep({})).toBe(TASK_LIST_URL);

    expect(applicant1Sequence[8].url).toBe(APPLICANT_1_IDENTITY_DOCUMENTS);
    expect(applicant1Sequence[8].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[8].getNextStep({})).toBe(TASK_LIST_URL);

    expect(applicant1Sequence[9].url).toBe(APPLICANT_1_FIND_ADDRESS);
    expect(applicant1Sequence[9].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[9].getNextStep({})).toBe(APPLICANT_1_SELECT_ADDRESS);

    expect(applicant1Sequence[10].url).toBe(APPLICANT_1_SELECT_ADDRESS);
    expect(applicant1Sequence[10].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[10].getNextStep({})).toBe(APPLICANT_1_CONTACT_DETAILS);

    expect(applicant1Sequence[11].url).toBe(APPLICANT_1_MANUAL_ADDRESS);
    expect(applicant1Sequence[11].showInSection).toBe(Sections.AboutApplicant1);
    expect(applicant1Sequence[11].getNextStep({})).toBe(APPLICANT_1_CONTACT_DETAILS);

    expect(applicant1Sequence[12].url).toBe(FEE_LOOKUP_URL);
    expect(applicant1Sequence[12].getNextStep({})).toBe(TASK_LIST_URL);
  });
});
