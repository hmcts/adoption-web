import { State } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { CommonContent } from '../../../common/common.content';
import { APPLICANT_2, REVIEW_CONTACT_DETAILS } from '../../../urls';

const en = ({ isDivorce, isApplicant2 }: CommonContent) => ({
  applicationDownloadLink: `<a class="govuk-link" href="/downloads/${
    isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'
  }"
  download="${isDivorce ? 'Divorce-application' : 'Civil-partnership-application'}">View the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } (PDF)</a>`,
  respondentAnswersDownloadLink: `<a class="govuk-link" href="/downloads/respondent-answers"
  download="Respondent-answers">View the response to the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } (PDF)</a>`,
  reviewContactDetails: `<a class="govuk-link" href="${
    (isApplicant2 ? APPLICANT_2 : '') + REVIEW_CONTACT_DETAILS
  }">Review your contact details</a>`,
  iWantTo: 'I want to...',
  gettingHelp: 'Getting help',
  telephone: '<strong>Phone</strong></br> 0300 303 0642</br> (Monday to Friday, 8am to 8PM, Saturday 8AM to 2PM)',
  email: `<strong>Email</strong><br>
    <a class="govuk-link" href="mailto:${
      isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'
    }">${isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'}</a>`,
  post: `
    <strong>Post</strong></br>
    Courts and Tribunals Service Centre</br>
    Digital Divorce</br>
    PO Box 12706</br>
    Harlow</br>
    CM20 9QT`,
  whatHappensNext: 'What happens next',
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const statesWithoutRespondentAnswers = [State.AwaitingAos, State.AosDrafted, State.AosOverdue];
  const aosSubmitted =
    !content.isJointApplication && !statesWithoutRespondentAnswers.includes(<State>content.userCase?.state);
  return {
    aosSubmitted,
    ...languages[content.language](content),
  };
};
