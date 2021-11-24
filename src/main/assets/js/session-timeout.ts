import { throttle } from 'lodash';

import { TIMED_OUT_URL } from '../../steps/urls';

const eventTimer = 5 * 60 * 1000; // 5 minutes
const sessionTimeoutInterval = 20 * 60 * 1000; // 20 minutes
let timeout;

const saveBeforeSessionTimeout = async () => {
  const form = document.getElementById('main-form');
  if (form) {
    const formData = new FormData(form as HTMLFormElement);
    formData.append('saveBeforeSessionTimeout', 'true');
    const url = window.location.pathname;
    const body = Object.fromEntries(formData);
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'csrf-token': body._csrf as string,
      },
      body: JSON.stringify(body),
    });
  }
  window.location.href = `${TIMED_OUT_URL}?lng=${document.documentElement.lang}`;
};

const setSaveTimeout = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveBeforeSessionTimeout();
  }, sessionTimeoutInterval);
};

const pingUserActive = throttle(
  () => {
    fetch('/active').then(() => {
      setSaveTimeout();
    });
  },
  eventTimer,
  { trailing: false }
);

setTimeout(() => {
  ['click', 'touchstart', 'mousemove', 'keypress'].forEach(evt => document.addEventListener(evt, pingUserActive));
}, eventTimer);
setSaveTimeout();
