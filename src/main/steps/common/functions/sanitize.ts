export function sanitizeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };
  const reg = /[&<>"'`=/]/gi;

  if (input) {
    return input.replace(reg, match => map[match]);
  }
  return input;
}

export function sanitizeHtmlArray(input: string[]): string[] {
  if (input) {
    return input.map(item => sanitizeHtml(item));
  }
  return input;
}
