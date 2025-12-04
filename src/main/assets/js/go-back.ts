import {
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
} from '../../steps/urls';

const backLink: HTMLAnchorElement | null = document.querySelector('.govuk-back-link');
if (backLink) {
  backLink.onclick = function (e) {
    e.preventDefault();
    if (document.location.pathname === PAY_YOUR_FEE || document.location.pathname === PAY_AND_SUBMIT) {
      document.location.href = `${PAYMENT_CALLBACK_URL}?back=true`;
    } else {
      history.go(-1);
    }
  };
}
