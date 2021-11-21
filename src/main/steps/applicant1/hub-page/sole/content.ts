import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { State, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import type { CommonContent } from '../../../common/common.content';
import { HOW_YOU_CAN_PROCEED } from '../../../urls';

dayjs.extend(advancedFormat);

const en = ({ isDivorce, partner, userCase }: CommonContent) => ({
  aosAwaitingOrDrafted: {
    line1: `Your application ${
      isDivorce ? 'for divorce' : 'to end your civil partnership'
    } has been submitted and checked by court staff. It's been ‘served’ (sent) to you and your ${partner}${
      userCase?.applicant2EmailAddress
        ? ' by email'
        : userCase?.applicant1KnowsApplicant2Address === YesOrNo.YES
        ? ' by post'
        : ''
    }.`,
    line2: `Your ${partner} should respond to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } by ${userCase?.dueDate || dayjs().add(2, 'weeks').format('D MMMM YYYY')}.`,
    line3:
      'You will be notified by email when they have responded. Or told what you can do next if they do not respond.',
  },
  aosDue: {
    line1: `Your ${partner} should have responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } by ${
      userCase?.dueDate || dayjs().add(17, 'day').format('D MMMM YYYY')
    }. They can still respond and have been sent a reminder. You can also contact them to remind them if it’s safe to do so.`,
    line2: `If you do not think they will respond then you can <a class="govuk-link" href="${HOW_YOU_CAN_PROCEED}">view the options for proceeding with your ${
      isDivorce ? 'divorce' : 'application to end your civil partnership'
    }</a>.`,
  },
  holding: {
    line1: `Your ${partner} has responded to your ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. You can <a class="govuk-link" href="/downloads/respondent-answers" download="Respondent-answers">download and read their response (PDF)</a>.`,
    line2: `The next step is for you to apply for a ‘conditional order’. A conditional order is a document that says the court does not see any reason why you cannot ${
      isDivorce ? 'get a divorce' : 'end your civil partnership'
    }.`,
    line3: `You can apply for a conditional order on ${
      userCase?.dueDate || dayjs().add(141, 'day').format('D MMMM YYYY')
    }. This is because you have to wait until 20 weeks from when the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } was issued. You will receive an email to remind you.`,
    readMore: 'Read more about the next steps',
    line4: `You have to complete 2 more steps before ${
      isDivorce ? 'you are legally divorced' : 'your civil partnership has ended'
    }:`,
    steps: {
      step1: `
        <strong>Apply for a conditional order</strong><br>
        This shows that the court agrees that you’re entitled to ${
          isDivorce ? 'get a divorce' : 'end your civil partnership'
        }.`,
      step2: `
        <strong>Apply for a final order</strong><br>
        This legally ends the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }. You cannot apply for a final order until 6 weeks after the conditional order.`,
    },
    line5: `You can use the time to decide how your money and property will be divided. This is dealt with separately to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }. <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Find out about dividing money and property</a>`,
  },
  pendingDispute: {
    line1: `Your ${partner} has responded to your application and said they want to defend the ${
      isDivorce ? 'divorce' : 'ending of your civil partnership'
    }. This means they want to try and prevent ${
      isDivorce ? 'the divorce' : 'the ending of your civil partnership'
    }. You can <a class="govuk-link" href="/downloads/respondent-answers" download="Respondent-answers">read their response here</a>.`,
    line2: `They have to submit an ‘answer’ to the court by ${
      userCase?.dueDate
    }. This is a form which explains their reasons for defending the ${
      isDivorce ? 'divorce' : 'ending of your civil partnership'
    }.`,
    line3: `If they submit the ‘answer’ then a judge will decide how to proceed. If they do not submit the form in time, then you will be able to proceed with the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    }.`,
  },
  dispute: {
    line1: `Your ${partner} has responded to your application and said they want to defend the ${
      isDivorce ? 'divorce' : 'ending of your civil partnership'
    }. This means they want to try and prevent ${
      isDivorce ? 'the divorce' : 'the ending of your civil partnership'
    }. You can read their response here.`,
    line2: `They have submitted their ‘answer’. This is the form which explains their case for defending the ${
      isDivorce ? 'divorce' : 'ending of your civil partnership'
    }.`,
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

export const generateContent: TranslationFn = content => {
  const progressionIndex = [
    State.AwaitingAos,
    State.AosDrafted,
    State.AosOverdue,
    State.Holding,
    State.PendingDispute,
    State.Disputed,
    State.AwaitingLegalAdvisorReferral,
    State.AwaitingPronouncement,
    State.FinalOrderComplete,
  ].indexOf(content.userCase?.state as State);
  return {
    ...languages[content.language](content),
    progressionIndex,
  };
};
