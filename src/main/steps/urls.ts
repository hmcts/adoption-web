export type PageLink = `/${string}`;

export const HOME_URL: PageLink = '/';
export const CALLBACK_URL: PageLink = '/receiver';
export const SIGN_IN_URL: PageLink = '/login';
export const SIGN_OUT_URL: PageLink = '/logout';
export const SAVE_AND_SIGN_OUT: PageLink = '/save-and-sign-out';
export const TIMED_OUT_URL: PageLink = '/timed-out';
export const TIMED_OUT_REDIRECT: PageLink = '/timed-out-redirect';
export const KEEP_ALIVE_URL: PageLink = '/keep-alive';
export const CSRF_TOKEN_ERROR_URL: PageLink = '/csrf-token-error';

export const RESPONDENT: PageLink = '/respondent';

export const APPLICATION_ENDED: PageLink = '/application-ended';
export const TASK_LIST_URL: PageLink = '/task-list';

export const APPLYING_WITH_URL: PageLink = '/applying-with';
export const DATE_CHILD_MOVED_IN: PageLink = '/date-child-moved-in';

export const APPLICANT_1: PageLink = '/applicant1';
export const APPLICANT_1_FULL_NAME: PageLink = `${APPLICANT_1}/full-name`;
export const APPLICANT_1_OTHER_NAMES: PageLink = `${APPLICANT_1}/other-names`;
export const APPLICANT_1_DOB: PageLink = `${APPLICANT_1}/dob`;
export const APPLICANT_1_OCCUPATION: PageLink = `${APPLICANT_1}/occupation`;
export const APPLICANT_1_EXTRA_SUPPORT: PageLink = `${APPLICANT_1}/extra-support`;
export const APPLICANT_1_CONTACT_DETAILS: PageLink = `${APPLICANT_1}/contact-details`;
export const APPLICANT_1_FIND_ADDRESS: PageLink = `${APPLICANT_1}/address/lookup`;
export const APPLICANT_1_SELECT_ADDRESS: PageLink = `${APPLICANT_1}/address/select`;
export const APPLICANT_1_MANUAL_ADDRESS: PageLink = `${APPLICANT_1}/address/manual`;
export const APPLICANT_1_CHANGE_ADDRESS: PageLink = `${APPLICANT_1}/address/change`;
export const APPLICANT_1_CONFIRM_CHANGE_ADDRESS: PageLink = `${APPLICANT_1}/address/confirm-change`;
export const APPLICANT_1_LANGUAGE_PREFERENCE: PageLink = `${APPLICANT_1}/language-preference`;

export const APPLICANT_2: PageLink = '/applicant2';
export const APPLICANT_2_FULL_NAME: PageLink = `${APPLICANT_2}/full-name`;
export const APPLICANT_2_OTHER_NAMES: PageLink = `${APPLICANT_2}/other-names`;
export const APPLICANT_2_DOB: PageLink = `${APPLICANT_2}/dob`;
export const APPLICANT_2_OCCUPATION: PageLink = `${APPLICANT_2}/occupation`;
export const APPLICANT_2_EXTRA_SUPPORT: PageLink = `${APPLICANT_2}/extra-support`;
export const APPLICANT_2_SAME_ADDRESS: PageLink = `${APPLICANT_2}/same-address`;
export const APPLICANT_2_FIND_ADDRESS: PageLink = `${APPLICANT_2}/address/lookup`;
export const APPLICANT_2_SELECT_ADDRESS: PageLink = `${APPLICANT_2}/address/select`;
export const APPLICANT_2_MANUAL_ADDRESS: PageLink = `${APPLICANT_2}/address/manual`;
export const APPLICANT_2_CHANGE_ADDRESS: PageLink = `${APPLICANT_2}/address/change`;
export const APPLICANT_2_CONFIRM_CHANGE_ADDRESS: PageLink = `${APPLICANT_2}/address/confirm-change`;
export const APPLICANT_2_CONTACT_DETAILS: PageLink = `${APPLICANT_2}/contact-details`;
export const APPLICANT_2_LANGUAGE_PREFERENCE: PageLink = `${APPLICANT_2}/language-preference`;

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
export const CHILDREN_FIND_PLACEMENT_ORDER_COURT: PageLink = `${CHILDREN}/find-placement-order-court`;
export const CHILDREN_FIND_FAMILY_COURT: PageLink = `${CHILDREN}/find-family-court`;

export const SIBLING: PageLink = '/sibling';
export const SIBLING_EXISTS: PageLink = `${SIBLING}/exists`;
export const SIBLING_RELATION: PageLink = `${SIBLING}/relation`;
export const SIBLING_ORDER_TYPE: PageLink = `${SIBLING}/placement-order-type`;
export const SIBLING_ORDER_CASE_NUMBER: PageLink = `${SIBLING}/placement-order-number`;
export const SIBLING_ORDER_SUMMARY: PageLink = `${SIBLING}/summary`;
export const SIBLING_ORDER_CHECK_YOUR_ANSWERS: PageLink = `${SIBLING}/placement-order-check-your-answers`;
export const SIBLING_REMOVE_PLACEMENT_ORDER: PageLink = `${SIBLING}/remove-placement-order`;

export const BIRTH_MOTHER: PageLink = '/birth-mother';
export const BIRTH_MOTHER_FULL_NAME: PageLink = `${BIRTH_MOTHER}/full-name`;
export const BIRTH_MOTHER_STILL_ALIVE: PageLink = `${BIRTH_MOTHER}/still-alive`;
export const BIRTH_MOTHER_NATIONALITY: PageLink = `${BIRTH_MOTHER}/nationality`;
export const BIRTH_MOTHER_OCCUPATION: PageLink = `${BIRTH_MOTHER}/occupation`;
export const BIRTH_MOTHER_ADDRESS_KNOWN: PageLink = `${BIRTH_MOTHER}/address-known`;
export const BIRTH_MOTHER_FIND_ADDRESS: PageLink = `${BIRTH_MOTHER}/address/lookup`;
export const BIRTH_MOTHER_SELECT_ADDRESS: PageLink = `${BIRTH_MOTHER}/address/select`;
export const BIRTH_MOTHER_MANUAL_ADDRESS: PageLink = `${BIRTH_MOTHER}/address/manual`;
export const BIRTH_MOTHER_INTERNATIONAL_ADDRESS: PageLink = `${BIRTH_MOTHER}/address/international`;

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

export const PAY_AND_SUBMIT: PageLink = '/pay-and-submit';

export const NO_RESPONSE_YET: PageLink = '/no-response-yet';

export const APPLICATION_SUBMITTED: PageLink = '/application/submitted';

export const DOWNLOAD_APPLICATION_SUMMARY: PageLink = '/download-summary';

export const NEW_APPLICATION_REDIRECT: PageLink = '/new-application-redirect';

export const SWITCH_TO_SOLE_APPLICATION: PageLink = '/switch-to-sole-application';

export const CONFIRM_JOINT_APPLICATION: PageLink = '/confirm-your-joint-application';

export const HUB_PAGE: PageLink = '/hub-page';
export const HOW_DO_YOU_WANT_TO_RESPOND: PageLink = '/how-do-you-want-to-respond';

export const ELIGIBILITY_URL: PageLink = '/eligibility';
export const START_ELIGIBILITY_URL: PageLink = `${ELIGIBILITY_URL}/start`;
export const CHECK_ELIGIBILITY_URL_MULTIPLE_CHILDREN: PageLink = `${ELIGIBILITY_URL}/multiple-children`;
export const CHECK_ELIGIBILITY_URL_MULTIPLE_CHILDREN_DESC: PageLink = `${ELIGIBILITY_URL}/multiple-children-desc`;
export const CHECK_ELIGIBILITY_URL_UNDER_18: PageLink = `${ELIGIBILITY_URL}/under-18`;
export const CHECK_ELIGIBILITY_URL_MARRIED: PageLink = `${ELIGIBILITY_URL}/married`;
export const CHECK_ELIGIBILITY_URL_UNDER_21: PageLink = `${ELIGIBILITY_URL}/under-21`;
export const CHECK_ELIGIBILITY_URL_DOMICILE: PageLink = `${ELIGIBILITY_URL}/domicile`;
export const CHECK_ELIGIBILITY_URL_LIVED_UK: PageLink = `${ELIGIBILITY_URL}/lived-uk`;
export const INELIGIBLE_TO_ADOPT: PageLink = `${ELIGIBILITY_URL}/cannot-apply`;

export const OTHER_PARENT: PageLink = '/other-parent';
export const OTHER_PARENT_EXISTS: PageLink = `${OTHER_PARENT}/exists`;
export const OTHER_PARENT_NAME: PageLink = `${OTHER_PARENT}/full-name`;
export const OTHER_PARENT_ADDRESS_KNOWN: PageLink = `${OTHER_PARENT}/address-known`;
export const OTHER_PARENT_POSTCODE_LOOKUP: PageLink = `${OTHER_PARENT}/address/lookup`;
export const OTHER_PARENT_VERIFY_ADDRESS: PageLink = `${OTHER_PARENT}/address/select`;
export const OTHER_PARENT_MANUAL_ADDRESS: PageLink = `${OTHER_PARENT}/address/manual`;
export const OTHER_PARENT_INTERNATIONAL_ADDRESS: PageLink = `${OTHER_PARENT}/address/international`;

export const BIRTH_FATHER = '/birth-father';
export const BIRTH_FATHER_NAME_ON_CERTIFICATE: PageLink = `${BIRTH_FATHER}/name-on-certificate`;
export const BIRTH_FATHER_FULL_NAME: PageLink = `${BIRTH_FATHER}/full-name`;
export const BIRTH_FATHER_ADDRESS_KNOWN: PageLink = `${BIRTH_FATHER}/address-known`;
export const BIRTH_FATHER_STILL_ALIVE: PageLink = `${BIRTH_FATHER}/alive`;
export const BIRTH_FATHER_PARENTAL_RESPONSIBILITY: PageLink = `${BIRTH_FATHER}/parental-responsibility`;
export const BIRTH_FATHER_PARENTAL_RESPONSIBILITY_GRANTED: PageLink = `${BIRTH_FATHER}/parental-responsibility/granted`;
export const BIRTH_FATHER_NO_PARENTAL_RESPONSIBILITY: PageLink = `${BIRTH_FATHER}/parental-responsibility/no-responsibility`;
export const BIRTH_FATHER_ADDRESS_LOOKUP: PageLink = `${BIRTH_FATHER}/address/lookup`;
export const BIRTH_FATHER_ADDRESS_SELECT: PageLink = `${BIRTH_FATHER}/address/select`;
export const BIRTH_FATHER_MANUAL_ADDRESS: PageLink = `${BIRTH_FATHER}/address/manual`;
export const BIRTH_FATHER_INTERNATIONAL_ADDRESS: PageLink = `${BIRTH_FATHER}/address/international`;
export const BIRTH_FATHER_NATIONALITY: PageLink = `${BIRTH_FATHER}/nationality`;
export const BIRTH_FATHER_OCCUPATION: PageLink = `${BIRTH_FATHER}/occupation`;

export const REVIEW_PAY_SUBMIT: PageLink = '/review-pay-submit';
export const CHECK_ANSWERS_URL: PageLink = `${REVIEW_PAY_SUBMIT}/check-your-answers`;
export const PAY_AND_SUBMIT_URL: PageLink = `${REVIEW_PAY_SUBMIT}/pay-and-submit`;
export const PAY_YOUR_FEE: PageLink = `${REVIEW_PAY_SUBMIT}/payment/pay-your-fee`;
export const PAYMENT_CALLBACK_URL: PageLink = `${REVIEW_PAY_SUBMIT}/payment/payment-callback`;

export const LOCAL_AUTHORITY: PageLink = `${CHILDREN}/local-authority`;
export const ADOPTION_AGENCY: PageLink = `${CHILDREN}/adoption-agency`;
export const OTHER_ADOPTION_AGENCY: PageLink = `${CHILDREN}/other-adoption-agency`;
export const SOCIAL_WORKER: PageLink = `${CHILDREN}/social-worker`;
export const APPLICANT_SOCIAL_WORKER: PageLink = `${CHILDREN}/applicant-social-worker`;
export const STATEMENT_OF_TRUTH: PageLink = `${REVIEW_PAY_SUBMIT}/statement-of-truth`;
export const EQUALITY: PageLink = `${REVIEW_PAY_SUBMIT}/equality`;

export const UPLOAD_YOUR_DOCUMENTS: PageLink = '/upload-your-documents';
export const DOCUMENT_MANAGER: PageLink = '/document-manager';
export const LA_DOCUMENT_MANAGER: PageLink = '/la-document-manager';

export const COOKIES_PAGE: PageLink = '/cookies';
export const PRIVACY_POLICY: PageLink = '/privacy-policy';
export const ACCESSIBILITY_STATEMENT: PageLink = '/accessibility-statement';
export const TERMS_AND_CONDITIONS: PageLink = '/terms-and-conditions';
export const CONTACT_US: PageLink = '/contact-us';

export const SAVE_AS_DRAFT: PageLink = '/save-as-draft';
export const SAVE_AND_RELOGIN: PageLink = '/save-and-relogin';

/*********************************** LA PORTAL URLS ***********************************/
export const LA_PORTAL = '/la-portal';
export const LA_PORTAL_KBA_CASE_REF = '/la-portal/kba-case-ref';
export const LA_PORTAL_KBA_CALLBACK = '/la-portal/kba-completed';
export const LA_PORTAL_NEG_SCENARIO = '/la-portal/negative-scenario';
export const LA_PORTAL_START_PAGE: PageLink = `${LA_PORTAL}/start-page`;
export const LA_PORTAL_TASK_LIST: PageLink = `${LA_PORTAL}/task-list`;
export const LA_PORTAL_UPLOAD_YOUR_DOCUMENTS: PageLink = `${LA_PORTAL}/la-portal/upload-your-documents`;
export const LA_PORTAL_CHILD_SEX_AT_BIRTH: PageLink = `${LA_PORTAL}/child/sex-at-birth`;
export const LA_PORTAL_CHILD_NATIONALITY: PageLink = `${LA_PORTAL}/child/nationality`;
export const LA_PORTAL_CHILD_PLACEMENT_ORDER_TYPE: PageLink = `${LA_PORTAL}/child/placement-order-type`;
export const LA_PORTAL_CHILD_PLACEMENT_ORDER_NUMBER: PageLink = `${LA_PORTAL}/child/placement-order-number`;
export const LA_PORTAL_CHILD_PLACEMENT_ORDER_COURT: PageLink = `${LA_PORTAL}/child/placement-order-court`;
export const LA_PORTAL_CHILD_PLACEMENT_ORDER_DATE: PageLink = `${LA_PORTAL}/child/placement-order-date`;
export const LA_PORTAL_CHILD_PLACEMENT_ORDER_SUMMARY: PageLink = `${LA_PORTAL}/child/placement-order-summary`;
export const LA_PORTAL_CHILD_PLACEMENT_ORDER_CHECK_YOUR_ANSWERS: PageLink = `${LA_PORTAL}/child/placement-order-check-your-answers`;
export const LA_PORTAL_CHILD_PLACEMENT_ORDER_REMOVE_PLACEMENT_ORDER: PageLink = `${LA_PORTAL}/child/remove-placement-order`;

export const LA_PORTAL_BIRTH_MOTHER_FULL_NAME: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/full-name`;
export const LA_PORTAL_BIRTH_MOTHER_STILL_ALIVE: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/still-alive`;
export const LA_PORTAL_BIRTH_MOTHER_NATIONALITY: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/nationality`;
export const LA_PORTAL_BIRTH_MOTHER_OCCUPATION: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/occupation`;
export const LA_PORTAL_BIRTH_MOTHER_ADDRESS_KNOWN: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/address-known`;
export const LA_PORTAL_BIRTH_MOTHER_FIND_ADDRESS: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/address/lookup`;
export const LA_PORTAL_BIRTH_MOTHER_SELECT_ADDRESS: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/address/select`;
export const LA_PORTAL_BIRTH_MOTHER_MANUAL_ADDRESS: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/address/manual`;
export const LA_PORTAL_BIRTH_MOTHER_INTERNATIONAL_ADDRESS: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/address/international`;
export const LA_PORTAL_BIRTH_MOTHER_LAST_ADDRESS_CONFIRMED: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/last-address-confirmed`;
export const LA_PORTAL_BIRTH_MOTHER_SERVED_WITH: PageLink = `${LA_PORTAL}${BIRTH_MOTHER}/served-with`;

export const LA_PORTAL_BIRTH_FATHER_NAME_ON_CERTIFICATE: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/name-on-certificate`;
export const LA_PORTAL_BIRTH_FATHER_IDENTITY_KNOWN: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/identity-known`;
export const LA_PORTAL_BIRTH_FATHER_FULL_NAME: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/full-name`;
export const LA_PORTAL_BIRTH_FATHER_STILL_ALIVE: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/still-alive`;
export const LA_PORTAL_BIRTH_FATHER_PARENTAL_RESPONSIBILITY: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/parental-responsibility`;
export const LA_PORTAL_BIRTH_FATHER_PARENTAL_RESPONSIBILITY_GRANTED: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/parental-responsibility/granted`;
export const LA_PORTAL_BIRTH_FATHER_NO_PARENTAL_RESPONSIBILITY: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/parental-responsibility/no-responsibility`;
export const LA_PORTAL_BIRTH_FATHER_NATIONALITY: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/nationality`;
export const LA_PORTAL_BIRTH_FATHER_OCCUPATION: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/occupation`;
export const LA_PORTAL_BIRTH_FATHER_ADDRESS_KNOWN: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/address-known`;
export const LA_PORTAL_BIRTH_FATHER_FIND_ADDRESS: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/address/lookup`;
export const LA_PORTAL_BIRTH_FATHER_SELECT_ADDRESS: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/address/select`;
export const LA_PORTAL_BIRTH_FATHER_MANUAL_ADDRESS: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/address/manual`;
export const LA_PORTAL_BIRTH_FATHER_INTERNATIONAL_ADDRESS: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/address/international`;
export const LA_PORTAL_BIRTH_FATHER_LAST_ADDRESS_CONFIRMED: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/last-address-confirmed`;
export const LA_PORTAL_BIRTH_FATHER_SERVED_WITH: PageLink = `${LA_PORTAL}${BIRTH_FATHER}/served-with`;

export const LA_PORTAL_OTHER_PARENT_EXISTS: PageLink = `${LA_PORTAL}${OTHER_PARENT}/exists`;
export const LA_PORTAL_OTHER_PARENT_FULL_NAME: PageLink = `${LA_PORTAL}${OTHER_PARENT}/full-name`;
export const LA_PORTAL_OTHER_PARENT_ADDRESS_KNOWN: PageLink = `${LA_PORTAL}${OTHER_PARENT}/address-known`;
export const LA_PORTAL_OTHER_PARENT_FIND_ADDRESS: PageLink = `${LA_PORTAL}${OTHER_PARENT}/address/lookup`;
export const LA_PORTAL_OTHER_PARENT_SELECT_ADDRESS: PageLink = `${LA_PORTAL}${OTHER_PARENT}/address/select`;
export const LA_PORTAL_OTHER_PARENT_MANUAL_ADDRESS: PageLink = `${LA_PORTAL}${OTHER_PARENT}/address/manual`;
export const LA_PORTAL_OTHER_PARENT_INTERNATIONAL_ADDRESS: PageLink = `${LA_PORTAL}${OTHER_PARENT}/address/international`;
export const LA_PORTAL_OTHER_PARENT_LAST_ADDRESS_CONFIRMED: PageLink = `${LA_PORTAL}${OTHER_PARENT}/last-address-confirmed`;
export const LA_PORTAL_OTHER_PARENT_SERVED_WITH: PageLink = `${LA_PORTAL}${OTHER_PARENT}/served-with`;

export const LA_PORTAL_SIBLING_EXISTS: PageLink = `${LA_PORTAL}${SIBLING}/exists`;
export const LA_PORTAL_SIBLING_RELATION: PageLink = `${LA_PORTAL}${SIBLING}/relation`;
export const LA_PORTAL_SIBLING_ORDER_TYPE: PageLink = `${LA_PORTAL}${SIBLING}/placement-order-type`;
export const LA_PORTAL_SIBLING_ORDER_CASE_NUMBER: PageLink = `${LA_PORTAL}${SIBLING}/placement-order-number`;
export const LA_PORTAL_SIBLING_ORDER_SUMMARY: PageLink = `${LA_PORTAL}${SIBLING}/summary`;
export const LA_PORTAL_SIBLING_ORDER_CHECK_YOUR_ANSWERS: PageLink = `${LA_PORTAL}${SIBLING}/placement-order-check-your-answers`;
export const LA_PORTAL_SIBLING_REMOVE_PLACEMENT_ORDER: PageLink = `${LA_PORTAL}${SIBLING}/remove-placement-order`;

export const LA_PORTAL_COOKIES_PAGE: PageLink = `${LA_PORTAL}/cookies`;
export const LA_PORTAL_PRIVACY_POLICY: PageLink = `${LA_PORTAL}/privacy-policy`;
export const LA_PORTAL_ACCESSIBILITY_STATEMENT: PageLink = `${LA_PORTAL}/accessibility-statement`;
export const LA_PORTAL_TERMS_AND_CONDITIONS: PageLink = `${LA_PORTAL}/terms-and-conditions`;
export const LA_PORTAL_CONTACT_US: PageLink = `${LA_PORTAL}/contact-us`;

export const LA_PORTAL_CHECK_YOUR_ANSWERS: PageLink = `${LA_PORTAL}/check-your-answers`;
export const LA_PORTAL_STATEMENT_OF_TRUTH: PageLink = `${LA_PORTAL}/statement-of-truth`;
export const LA_PORTAL_CONFIRMATION_PAGE: PageLink = `${LA_PORTAL}/confirmation`;
