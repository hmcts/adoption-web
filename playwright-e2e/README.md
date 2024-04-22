# 🎭 Playwright End-to-End UI Testing Suite

End to end UI testing suite using:

- Playwright https://playwright.dev/
- TypeScript https://www.typescriptlang.org/

## 🤖 Getting Started

To begin, familiarise yourself with the options available for running tests by visiting Playwright's documentation https://playwright.dev/docs/running-tests.

To execute the 'smoke-test.spec.ts' individually from the terminal,  simply use the following command: `yarn playwright test smoke-test.spec.ts`.

## 📁 Structure

```sh
|- playwright-e2e
|-|- pages # Where to keep page classes with respective locators and methods. We utilise POM (Page Object Modeling).
|-|- settings # essential settings for the framework, such as user credentials and URLs.
|-|- tests # Here is where you can do your magic. 🧙‍♂️

 playwright.config.ts # This sits outside playwright-e2e folder in the projects root. It is the config file for playwright only tests.
```
