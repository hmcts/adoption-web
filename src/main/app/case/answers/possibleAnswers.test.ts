import { StepWithContent } from '../../../steps';
import { Case } from '../case';

import { omitUnreachableAnswers } from './possibleAnswers';

describe('omitUnreachableAnswers()', () => {
  test('omits unreachable answers', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      valid2: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => 'next-url',
        form: { fields: { valid1: {} } },
      },
      {
        url: 'next-url',
        getNextStep: () => '',
        form: { fields: { valid2: {} } },
      },
    ] as unknown as StepWithContent[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me', valid2: 'pick-me' });
  });

  test('omits unreachable answers with checkboxes', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: { fields: { someCheckboxes: { type: 'checkboxes', values: [{ name: 'valid1' }] } } },
      },
      {
        url: 'not-this-one',
        getNextStep: () => '',
        form: { fields: { someCheckboxes: { type: 'checkboxes', values: [{ name: 'invalid1' }] } } },
      },
    ] as unknown as StepWithContent[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me' });
  });

  test('omits unreachable answers with subfields', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      valid2: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: {
          fields: {
            someCheckboxes: {
              type: 'radios',
              values: [{ value: 'Yes', subFields: { valid1: { type: 'text' }, valid2: { type: 'text' } } }],
            },
          },
        },
      },
    ] as unknown as StepWithContent[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me', valid2: 'pick-me' });
  });

  test('omits unreachable answers with date', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: { fields: { valid1: { type: 'date', values: [{ name: 'day' }] } } },
      },
    ] as unknown as StepWithContent[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me' });
  });
});
