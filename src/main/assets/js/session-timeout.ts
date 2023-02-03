import { throttle } from 'lodash';

import { KEEP_ALIVE_URL, TIMED_OUT_URL } from '../../steps/urls';

const eventTimer = 1 * 60 * 1000; // 5 minutes
const TIMEOUT_NOTICE = 2 * 60 * 1000; // 2 minutes
const sessionTimeoutInterval = 20 * 60 * 1000; // 20 minutes

let timeout;
let notificationTimer;
let countdownInterval;

let notificationPopupIsOpen = false;
const notificationPopup: HTMLElement | null = document.getElementById('timeout-modal-container');
const popupCloseBtn: HTMLButtonElement | null | undefined =
  notificationPopup?.querySelector('#timeout-modal-close-button');
const countdownTimer: HTMLSpanElement | null | undefined = notificationPopup?.querySelector('#countdown-timer');
const form = document.getElementById('main-form');

const saveBeforeSessionTimeout = async () => {
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
  window.location.href = `${TIMED_OUT_URL}?lang=${document.documentElement.lang}`;
};

const schedule = () => {
  setSaveTimeout();
  onNotificationPopupClose();
};

const onNotificationPopupClose = () => {
  popupCloseBtn?.addEventListener('click', () => {
    clearCountdown();
    showNotificationPopup(false);
    setSaveTimeout();
    pingUserActive();
  });
};

const startCountdown = () => {
  const startTime = new Date().getTime() + TIMEOUT_NOTICE;
  countdownInterval = setInterval(() => {
    const countdown = startTime - new Date().getTime();
    if (countdownTimer) {
      countdownTimer.innerHTML = convertToHumanReadableText(countdown);
    }
  }, 1000);
};

const clearCountdown = () => {
  if (countdownInterval && countdownTimer) {
    clearInterval(countdownInterval);
    countdownTimer.innerHTML = convertToHumanReadableText(TIMEOUT_NOTICE);
  }
};

const showNotificationPopup = (visible: boolean) => {
  if (visible) {
    notificationPopup?.removeAttribute('hidden');
    notificationPopupIsOpen = true;
    startCountdown();
    trapFocusInModal();
  } else {
    notificationPopup?.setAttribute('hidden', 'hidden');
    notificationPopupIsOpen = false;
  }
};

const convertToHumanReadableText = (countdown: number) => {
  if (countdownTimer) {
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    const defaultText = countdownTimer.dataset.default;
    const secondsText = countdownTimer.dataset.seconds;
    const minutesText = countdownTimer.dataset.minutes;
    switch (minutes) {
      case 0:
        return ` ${seconds} ${secondsText} `;
      case 2:
        return ` ${defaultText} `;
      default:
        return ` ${minutes} ${minutesText} ${seconds} ${secondsText} `;
    }
  }
  return '';
};

const trapFocusInModal = () => {
  const firstFocusableElement: HTMLSpanElement | null | undefined = notificationPopup?.querySelector('#timeout-modal');
  const lastFocusableElement: HTMLAnchorElement | null | undefined =
    notificationPopup?.querySelector('#timeout-signout-link');
  firstFocusableElement?.focus();
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          event.preventDefault();
        }
      }
    }
  });
};

const scheduleNotificationPopup = () => {
  clearTimeout(notificationTimer);
  notificationTimer = setTimeout(() => showNotificationPopup(true), sessionTimeoutInterval - TIMEOUT_NOTICE);
};

const setSaveTimeout = () => {
  scheduleNotificationPopup();
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveBeforeSessionTimeout();
  }, sessionTimeoutInterval);
};

const pingUserActive = throttle(
  () => {
    fetch(KEEP_ALIVE_URL).then(() => {
      if (!notificationPopupIsOpen) {
        schedule();
      }
    });
  },
  eventTimer,
  { trailing: false }
);

setTimeout(() => {
  ['click', 'touchstart', 'mousemove', 'keypress', 'keydown', 'scroll'].forEach(evt =>
    document.addEventListener(evt, pingUserActive)
  );
}, eventTimer);
schedule();
