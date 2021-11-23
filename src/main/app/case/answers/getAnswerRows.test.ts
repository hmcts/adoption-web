import { StepWithContent } from '../../../steps';
import { Sections } from '../../../steps/applicant1Sequence';
import * as commonContent from '../../../steps/common/common.content';
import { APPLY_FINANCIAL_ORDER } from '../../../steps/urls';
import { Checkbox } from '../case';
import { YesOrNo } from '../definition';

import { getAnswerRows } from './getAnswerRows';

const mockStepsWithContentApplicant1: jest.Mock<StepWithContent[]> = jest.fn();
const mockStepsWithContentApplicant2: jest.Mock<StepWithContent[]> = jest.fn();
const mockStepsWithContentRespondent: jest.Mock<StepWithContent[]> = jest.fn();

jest.mock('../../../steps', () => ({
  get stepsWithContentApplicant1() {
    return mockStepsWithContentApplicant1();
  },
  get stepsWithContentApplicant2() {
    return mockStepsWithContentApplicant2();
  },
  get stepsWithContentRespondent() {
    return mockStepsWithContentRespondent();
  },
}));

const generatePageContentSpy = jest.spyOn(commonContent, 'generatePageContent');

describe('getAnswerRows()', () => {
  let mockGenerateContent;
  let mockNunjucksEnv;
  beforeEach(() => {
    mockGenerateContent = jest.fn().mockReturnValue({ en: {} });
    mockNunjucksEnv = {
      env: {
        filters: {
          nl2br: jest.fn(value => (value === '' ? '' : `newlineToBr(${value})`)),
          escape: jest.fn(value => (value === '' ? '' : `escaped(${value})`)),
        },
      },
    };
  });

  it('converts steps into the correct check answers rows when there no answers', () => {
    mockStepsWithContentApplicant1.mockReturnValue([
      {
        stepDir: '/',
        url: 'dont-pickThisOne',
        showInSection: Sections.AboutPartners,
        getNextStep: () => '/pickThisOne',
        form: { fields: {}, submit: { text: '' } },
        generateContent: () => ({}),
        view: '/template',
      },
      {
        stepDir: '/',
        url: 'pickThisOne',
        showInSection: Sections.AboutPartnership,
        getNextStep: () => '/',
        generateContent: mockGenerateContent,
        form: { fields: {}, submit: { text: '' } },
        view: '/template',
      },
    ]);

    const actual = getAnswerRows.bind({
      ...mockNunjucksEnv,
      ctx: {
        language: 'en',
        isDivorce: true,
        applicant2: 'husband',
        userCase: {},
        userEmail: 'test@example.com',
        isJointApplication: false,
      },
    })(Sections.AboutPartnership);

    expect(generatePageContentSpy).toHaveBeenCalledWith({
      userCase: {},
      isDivorce: true,
      language: 'en',
      pageContent: mockGenerateContent,
      userEmail: 'test@example.com',
    });
    expect(actual).toEqual([]);
  });

  describe('when we have response', () => {
    let mockCtx;
    let mockUserCase;
    beforeEach(() => {
      mockStepsWithContentApplicant1.mockReturnValue([
        {
          stepDir: '/',
          url: 'dont-pickThisOne',
          showInSection: Sections.AboutPartners,
          showInCompleteSection: Sections.AboutPartners,
          getNextStep: () => '/pickThisOne',
          generateContent: () => ({}),
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
        {
          stepDir: '/',
          url: 'pickThisOne',
          showInSection: Sections.AboutPartnership,
          showInCompleteSection: Sections.AboutPartnership,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
      ]);
      mockStepsWithContentApplicant2.mockReturnValue([
        {
          stepDir: '/',
          url: 'dont-pickThisOne-applicant2',
          showInSection: Sections.AboutPartners,
          showInCompleteSection: Sections.AboutPartners,
          getNextStep: () => '/pickThisOne',
          generateContent: () => ({}),
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
        {
          stepDir: '/',
          url: 'pickThisOne-applicant2',
          showInSection: Sections.AboutPartnership,
          showInCompleteSection: Sections.AboutPartnership,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
      ]);
      mockStepsWithContentRespondent.mockReturnValue([
        {
          stepDir: '/',
          url: 'dont-pickThisOne-respondent',
          showInSection: Sections.AboutPartners,
          showInCompleteSection: Sections.AboutPartners,
          getNextStep: () => '/pickThisOne',
          generateContent: () => ({}),
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
        {
          stepDir: '/',
          url: 'pickThisOne-respondent',
          showInSection: Sections.AboutPartnership,
          showInCompleteSection: Sections.AboutPartnership,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
      ]);

      mockGenerateContent.mockReturnValue({ title: 'Mock question title' });

      mockUserCase = {
        mockField: 'example response',
        applyForFinancialOrder: YesOrNo.YES,
        applicant1FullNameOnCertificate: 'Sarah Smith',
        applicant2FullNameOnCertificate: 'Billy Bob',
        applicant1LegalProceedings: YesOrNo.YES,
        applicant2LegalProceedings: YesOrNo.YES,
      };
      mockCtx = {
        language: 'en',
        isDivorce: true,
        isJointApplication: false,
        partner: 'husband',
        userCase: mockUserCase,
        change: 'Change',
        stepQuestions: {},
        stepAnswers: {},
        stepLinks: {},
      };
    });

    it('converts steps into the correct check answers rows', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: mockCtx,
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change',
                visuallyHiddenText: 'Mock question title',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(example response))',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows for applicant 2', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          isJointApplication: true,
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne-applicant2',
                text: 'Change',
                visuallyHiddenText: 'Mock question title',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(example response))',
          },
        },
      ]);
    });

    it('ignores steps that throw exceptions', () => {
      mockStepsWithContentApplicant1.mockReturnValue([
        {
          stepDir: '/',
          url: 'dont-pickThisOne',
          showInSection: Sections.AboutPartnership,
          getNextStep: () => '/pickThisOne',
          generateContent: () => {
            throw new Error('You cannot see this page');
          },
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
        {
          stepDir: '/',
          url: 'pickThisOne',
          showInSection: Sections.AboutPartnership,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: { fields: { mockField: { type: 'text', label: l => l.title } }, submit: { text: '' } },
          view: '/template',
        },
      ]);

      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: mockCtx,
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change',
                visuallyHiddenText: 'Mock question title',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(example response))',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows with overridden values', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          stepQuestions: { pickThisOne: { mockField: 'Custom question text' } },
          stepAnswers: { pickThisOne: { mockField: () => 'Custom answer text. Original answer: example response' } },
          stepLinks: { pickThisOne: '/custom-link' },
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: '/custom-link',
                text: 'Change',
                visuallyHiddenText: 'Custom question text',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Custom question text',
          },
          value: {
            html: 'newlineToBr(escaped(Custom answer text. Original answer: example response))',
          },
        },
      ]);
    });

    it('removes steps if check your answer page considers it incomplete', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          stepAnswers: { pickThisOne: { mockField: false } },
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([]);
    });

    it('keeps a steps if check your answer page returns an empty string', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          stepAnswers: { pickThisOne: { mockField: '' } },
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: { items: [{ href: 'pickThisOne', text: 'Change', visuallyHiddenText: 'Mock question title' }] },
          key: { classes: 'govuk-!-width-two-thirds', html: 'Mock question title' },
          value: { html: '' },
        },
      ]);
    });

    it('converts steps into the correct check answers rows with checkboxes', () => {
      mockStepsWithContentApplicant1.mockReturnValue([
        {
          stepDir: '/',
          url: 'pickThisOne',
          showInSection: Sections.AboutPartnership,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: {
            fields: {
              someCheckboxes: {
                type: 'checkboxes',
                label: () => 'Mock Checkboxes',
                values: [
                  { name: 'mockField1', label: () => 'Mock checkbox title 1', value: Checkbox.Checked },
                  { name: 'mockField2', label: () => 'Another checkbox title 2', value: Checkbox.Checked },
                ],
              },
            },
            submit: { text: '' },
          },
          view: '/template',
        },
      ]);

      mockUserCase = { mockField1: Checkbox.Checked, mockField2: Checkbox.Checked };
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          userCase: mockUserCase,
        },
      })(Sections.AboutPartnership);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne',
                text: 'Change',
                visuallyHiddenText: 'Mock Checkboxes',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock Checkboxes',
          },
          value: {
            html: 'newlineToBr(escaped(Mock checkbox title 1\nAnother checkbox title 2))',
          },
        },
      ]);
    });
    it('converts steps into the correct check answers rows with overridden values to show applicant 1', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          isJointApplication: true,
          stepQuestions: { pickThisOne: { mockField: 'Custom question text' } },
          stepAnswers: { pickThisOne: { mockField: () => 'Custom answer text. Original answer: example response' } },
          stepAnswersWithHTML: {
            pickThisOne: { mockField: '<div>test</div>' },
          },
          stepLinks: { pickThisOne: '/custom-link' },
        },
      })(Sections.AboutPartnership, false, true, 1);

      expect(actual).toEqual([
        {
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Custom question text',
          },
          value: {
            html: 'newlineToBr(escaped(Custom answer text. Original answer: example response))<div>test</div>',
          },
          actions: {
            items: [
              {
                href: '/custom-link',
                text: 'Change',
                visuallyHiddenText: 'Custom question text',
              },
            ],
          },
        },
      ]);
    });
    it('converts steps into the correct check answers rows with overridden values to show applicant 1 and do not show actions', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          isJointApplication: true,
          stepQuestions: { pickThisOne: { mockField: 'Custom question text' } },
          stepAnswers: { pickThisOne: { mockField: () => 'Custom answer text. Original answer: example response' } },
          stepAnswersWithHTML: {
            pickThisOne: { mockField: '<div>test</div>' },
          },
          stepLinks: { pickThisOne: '/custom-link' },
        },
      })(Sections.AboutPartnership, false, false, 1);

      expect(actual).toEqual([
        {
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Custom question text',
          },
          value: {
            html: 'newlineToBr(escaped(Custom answer text. Original answer: example response))<div>test</div>',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows with overridden values to show applicant 2', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          isJointApplication: true,
        },
      })(Sections.AboutPartnership, false, true, 2);

      expect(actual).toEqual([
        {
          actions: {
            items: [
              {
                href: 'pickThisOne-applicant2',
                text: 'Change',
                visuallyHiddenText: 'Mock question title',
              },
            ],
          },
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(example response))',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows for confirm joint application page', () => {
      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          isJointApplication: true,
        },
      })(Sections.AboutPartnership, true, false);

      expect(actual).toEqual([
        {
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(example response))',
          },
        },
        {
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(example response))',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows for confirm joint application page with additional dividingAssets questions', () => {
      mockStepsWithContentApplicant1.mockReturnValue([
        {
          stepDir: '/',
          url: APPLY_FINANCIAL_ORDER,
          showInCompleteSection: Sections.DividingAssets,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: {
            fields: {
              applyForFinancialOrder: {
                type: 'radios',
                label: l => l.title,
                values: [
                  {
                    label: l => l.yes,
                    value: YesOrNo.YES,
                  },
                ],
              },
            },
            submit: { text: '' },
          },
          view: '/template',
        },
      ]);

      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          isJointApplication: true,
        },
      })(Sections.DividingAssets, true, false);

      expect(actual).toEqual([
        {
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(Yes))',
          },
        },
        {
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(Yes))',
          },
        },
      ]);
    });

    it('converts steps into the correct check answers rows for confirm joint application page with additional aboutApplicant1 questions', () => {
      mockStepsWithContentApplicant1.mockReturnValue([
        {
          stepDir: '/',
          url: '/enter-your-name',
          showInCompleteSection: Sections.AboutApplicant1,
          getNextStep: () => '/',
          generateContent: mockGenerateContent,
          form: {
            fields: { applicant1FullNameOnCertificate: { type: 'text', label: l => l.title } },
            submit: { text: '' },
          },
          view: '/template',
        },
      ]);

      const actual = getAnswerRows.bind({
        ...mockNunjucksEnv,
        ctx: {
          ...mockCtx,
          isJointApplication: true,
        },
      })(Sections.AboutApplicant1, true, false);

      expect(actual).toEqual([
        {
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Mock question title',
          },
          value: {
            html: 'newlineToBr(escaped(Sarah Smith))',
          },
        },
        {
          key: {
            classes: 'govuk-!-width-two-thirds',
            html: 'Full name on the marriage certificate',
          },
          value: {
            html: 'Sarah Smith',
          },
        },
      ]);
    });
  });
});
