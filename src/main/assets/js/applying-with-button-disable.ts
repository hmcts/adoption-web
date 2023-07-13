const applyingWithButton = document.getElementById('applying-with-form-submit') as HTMLButtonElement;
const form = document.getElementById('main-form') as HTMLFormElement;

applyingWithButton?.addEventListener('click', listenerFunction);

function listenerFunction(this: HTMLElement, ev: Event) {
  applyingWithButton.disabled = true;
  form.submit();
  ev.preventDefault();
}
