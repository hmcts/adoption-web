import { sanitizeHtml, sanitizeHtmlArray } from "./sanitize";

test('Changes nothing in a string with no special characters', () => {
    const testString = "This is a test string 123";
    expect(sanitizeHtml(testString)).toBe(testString);
})

test('Returns undefined where input is undefined', () => {
    var testString;
    expect(sanitizeHtml(testString)).toBe(undefined);
})

test('Escapes special characters when input contains HTML', () => {
    const input = "<h2>HTML Injection</h2>";
    const expected = "&lt;h2&gt;HTML Injection&lt;&#x2F;h2&gt;";
    expect(sanitizeHtml(input)).toBe(expected);
})

test('Returns empty array when passed empty array', () => {
    const testArray = [];
    expect(sanitizeHtmlArray(testArray)).toStrictEqual([]);
})

test('Escapes special characters when input array contains HTML', () => {
    const testArray = [
        "<h2>HTML Injection</h2>", 
        "321 St Christopher-Walden's", 
        "Nothing to see here"
    ];
    const expected = [
        "&lt;h2&gt;HTML Injection&lt;&#x2F;h2&gt;", 
        "321 St Christopher-Walden&#x27;s", 
        "Nothing to see here"
    ];
    expect(sanitizeHtmlArray(testArray)).toStrictEqual(expected);
})