import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { State } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/hub-page/content';
import { CommonContent } from '../../common/common.content';

dayjs.extend(advancedFormat);

const en = ({ isDivorce, partner, userCase }: CommonContent) => ({
  subHeading1: [State.PendingDispute, State.Disputed].includes(userCase?.state as State)
    ? 'What you need to do next'
    : 'Latest update',
  awaitingAos: {
    line1: `Your ${partner} has submitted an application ${
      isDivorce ? 'for divorce' : 'to end your civil partnership'
    }.`,
  },
  holding: {
    line1: `You have responded to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. You do not have to do anything further.`,
    line2: `The next step is for your ${partner} to apply for a 'conditional order'. A conditional order is a document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get a divorce' : 'end your civil partnership'
    }.`,
    line3: `Your ${partner} can apply for a conditional order from ${
      userCase?.dueDate || dayjs().add(141, 'day').format('D MMMM YYYY')
    }. This is because they have to wait 20 weeks from when the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } was issued. You will receive an email when the conditional order has been granted.`,
    line4: `After the conditional order, they need to apply for a final order, which legally ends the ${
      isDivorce ? 'marriage' : 'civil partnership'
    }. This cannot be made until 6 weeks after the conditional order.`,
    line5: `You can use the time until the conditional order application to decide how your money and property will be divided. This is dealt with separately to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Find out more about dividing money and property</a>`,
  },
  pendingDispute: {
    line1: `You have responded to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } and said that you want to dispute it.`,
    line2: `You have until ${
      userCase?.dueDate || dayjs().add(37, 'day').format('D MMMM YYYY')
    } to submit the ‘answer a ${isDivorce ? 'divorce' : 'dissolution'}’ form. This is the form for disputing ${
      isDivorce ? 'the divorce' : 'ending your civil partnership'
    }. You can <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d8b-answer-to-a-divorcedissolutionjudicial-separation-or-nullity-petitionapplication">download the form here</a>.`,
    line3: `Fill in the form and email it to: <a class="govuk-link" href="mailto:${
      isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'
    }">${isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'}</a>`,
    line4: `<div class="govuk-body">Or post it to:</div>
      Courts and Tribunals Service centre<br>
      HMCTS ${isDivorce ? 'Divorce Service' : 'Ending Civil Partnerships'}<br>
      PO Box 12706<br>
      Harlow<br>
      CM20 9QT`,
    line5:
      'You’ll have to pay a £245 fee when you submit the form. If you have little or no savings, are on certain benefits or have low income you may be able to get <a class="govuk-link" href="https://www.gov.uk/get-help-with-court-fees">help paying the fee</a>.',
    line6: `If you do not submit your answer before ${
      userCase?.dueDate || dayjs().add(37, 'day').format('D MMMM YYYY')
    } then your ${partner} can continue ${isDivorce ? 'the divorce' : 'ending your civil partnership'}.`,
  },
  dispute: {
    line1: `You have responded to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } and said that you want to dispute it.`,
    line2: `You have submitted the ‘answer a ${
      isDivorce ? 'divorce' : 'dissolution'
    }’ form. This is the form for disputing ${isDivorce ? 'the divorce' : 'ending your civil partnership'}.`,
    line3: `A judge will decide whether you and your ${partner} need to attend a hearing. You may be contacted for more information to help them make a decision.`,
    line4: 'You’ll receive a letter in the post telling you if you need to attend the hearing, and where it will be.',
  },
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const form = applicant1Form;

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    ...languages[content.language](content),
  };
};
