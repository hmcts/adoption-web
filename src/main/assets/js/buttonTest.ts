const notificationPopup = document.getElementById('applying-with-form-submit') as HTMLButtonElement;
const form = document.getElementById('main-form') as HTMLFormElement;
console.log('form:  ' + form);

notificationPopup?.addEventListener('focus', listenerFunction);

function listenerFunction(this: HTMLElement, ev: Event) {
  notificationPopup.disabled = true;
  form.submit();
  ev.preventDefault();
}
