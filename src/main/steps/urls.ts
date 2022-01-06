export type PageLink = `/${string}`;

export const HOME_URL: PageLink = '/';
export const CALLBACK_URL: PageLink = '/receiver';
export const SIGN_IN_URL: PageLink = '/login';
export const SIGN_OUT_URL: PageLink = '/logout';
export const SAVE_AND_SIGN_OUT: PageLink = '/save-and-sign-out';
export const TIMED_OUT_URL: PageLink = '/timed-out';
export const KEEP_ALIVE_URL: PageLink = '/keep-alive';
export const CSRF_TOKEN_ERROR_URL: PageLink = '/csrf-token-error';

export const APPLICANT_1: PageLink = '/applicant1';
export const RESPONDENT: PageLink = '/respondent';

export const CHECK_ANSWERS_URL: PageLink = '/check-your-answers';

export const APPLICATION_ENDED: PageLink = '/application-ended';
export const TASK_LIST_URL: PageLink = '/task-list';

export const APPLYING_WITH_URL: PageLink = '/applying-with';
export const DATE_CHILD_MOVED_IN_URL: PageLink = '/date-child-moved-in';
export const APPLICANT_1_FULL_NAME: PageLink = '/applicant1/full-name';
export const APPLICANT_1_OTHER_NAMES: PageLink = '/applicant1/other-names';
export const APPLICANT_1_DOB: PageLink = '/applicant1/dob';
export const APPLICANT_1_NATIONALITY: PageLink = '/applicant1/nationality';
export const APPLICANT_1_OCCUPATION: PageLink = '/applicant1/occupation';
export const APPLICANT_1_CONTACT_DETAILS: PageLink = '/applicant1/contact-details';
export const APPLICANT_1_FIND_ADDRESS: PageLink = '/applicant1/find-address';
export const APPLICANT_1_SELECT_ADDRESS: PageLink = '/applicant1/select-address';
export const APPLICANT_1_MANUAL_ADDRESS: PageLink = '/applicant1/manual-address';
export const APPLICANT_1_IDENTITY_DOCUMENTS: PageLink = '/applicant1/identity-documents';

export const APPLICANT_2: PageLink = '/applicant2';
export const APPLICANT_2_FULL_NAME: PageLink = `${APPLICANT_2}/full-name`;
export const APPLICANT_2_OTHER_NAMES: PageLink = `${APPLICANT_2}/other-names`;
export const APPLICANT_2_DOB: PageLink = `${APPLICANT_2}/dob`;
export const APPLICANT_2_NATIONALITY: PageLink = `${APPLICANT_2}/nationality`;
export const APPLICANT_2_OCCUPATION: PageLink = `${APPLICANT_2}/occupation`;
export const APPLICANT_2_SAME_ADDRESS: PageLink = `${APPLICANT_2}/same-address`;
export const APPLICANT_2_FIND_ADDRESS: PageLink = `${APPLICANT_2}/address/lookup`;
export const APPLICANT_2_SELECT_ADDRESS: PageLink = `${APPLICANT_2}/address/select`;
export const APPLICANT_2_MANUAL_ADDRESS: PageLink = `${APPLICANT_2}/address/manual`;
export const APPLICANT_2_CONTACT_DETAILS: PageLink = `${APPLICANT_2}/contact-details`;

export const CHILDREN: PageLink = '/children';
export const CHILDREN_PLACEMENT_ORDER_TYPE: PageLink = `${CHILDREN}/placement-order-type`;
export const CHILDREN_PLACEMENT_ORDER_NUMBER: PageLink = `${CHILDREN}/placement-order-number`;
export const CHILDREN_PLACEMENT_ORDER_COURT: PageLink = `${CHILDREN}/placement-order-court`;
export const CHILDREN_PLACEMENT_ORDER_DATE: PageLink = `${CHILDREN}/placement-order-date`;
export const CHILDREN_PLACEMENT_ORDER_SUMMARY: PageLink = `${CHILDREN}/placement-order-summary`;
export const CHILDREN_PLACEMENT_ORDER_CHECK_YOUR_ANSWERS: PageLink = `${CHILDREN}/placement-order-check-your-answers`;

export const CHILDREN_FULL_NAME: PageLink = `${CHILDREN}/full-name`;
export const CHILDREN_DATE_OF_BIRTH: PageLink = `${CHILDREN}/date-of-birth`;
export const CHILDREN_SEX_AT_BIRTH: PageLink = `${CHILDREN}/sex-at-birth`;
export const CHILDREN_NATIONALITY: PageLink = `${CHILDREN}/nationality`;
export const CHILDREN_FULL_NAME_AFTER_ADOPTION: PageLink = `${CHILDREN}/full-name-after-adoption`;

export const RELATIONSHIP_DATE_URL: PageLink = '/date-from-certificate';

export const CHECK_JURISDICTION: PageLink = '/check-jurisdiction';
export const WHERE_YOUR_LIVES_ARE_BASED_URL: PageLink = '/where-your-lives-are-based';
export const JURISDICTION_INTERSTITIAL_URL: PageLink = '/you-can-use-english-welsh-courts';
export const RESIDUAL_JURISDICTION: PageLink = '/are-you-eligible-for-residual-jurisdiction';
export const JURISDICTION_MAY_NOT_BE_ABLE_TO: PageLink = '/you-may-not-be-able-to-england-and-wales';
export const JURISDICTION_CONNECTION_SUMMARY: PageLink = '/connection-summary';

export const YOUR_NAME: PageLink = '/enter-your-name';

export const APPLY_FINANCIAL_ORDER: PageLink = '/do-you-want-to-apply-financial-order';

export const SENT_TO_APPLICANT2_FOR_REVIEW: PageLink = '/application-sent-for-review';
export const PAY_YOUR_FEE: PageLink = '/pay-your-fee';
export const PAY_AND_SUBMIT: PageLink = '/pay-and-submit';

export const NO_RESPONSE_YET: PageLink = '/no-response-yet';

export const APPLICATION_SUBMITTED: PageLink = '/application-submitted';

export const SWITCH_TO_SOLE_APPLICATION: PageLink = '/switch-to-sole-application';

export const PAYMENT_CALLBACK_URL: PageLink = '/payment-callback';

export const CONFIRM_JOINT_APPLICATION: PageLink = '/confirm-your-joint-application';

export const HUB_PAGE: PageLink = '/hub-page';
export const HOW_DO_YOU_WANT_TO_RESPOND: PageLink = '/how-do-you-want-to-respond';

export const ELIGIBILITY_URL: PageLink = '/eligibility';
export const START_ELIGIBILITY_URL: PageLink = `${ELIGIBILITY_URL}/start`;
export const CHECK_ELIGIBILITY_URL_UNDER_18: PageLink = `${ELIGIBILITY_URL}/under-18`;
export const CHECK_ELIGIBILITY_URL_MARRIED: PageLink = `${ELIGIBILITY_URL}/married`;
export const CHECK_ELIGIBILITY_URL_UNDER_21: PageLink = `${ELIGIBILITY_URL}/under-21`;
export const CHECK_ELIGIBILITY_URL_LIVED_UK: PageLink = `${ELIGIBILITY_URL}/lived-uk`;
export const INELIGIBLE_TO_ADOPT: PageLink = `${ELIGIBILITY_URL}/cannot-apply`;

export const FEE_LOOKUP_URL: PageLink = '/fee-lookup';
