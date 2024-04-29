# 🎭 Playwright End-to-End UI Testing Suite

End to end UI testing suite using:

- Playwright https://playwright.dev/
- TypeScript https://www.typescriptlang.org/

## 🤖 Getting Started

Before diving in, make sure to explore the various options available for running tests in Playwright by referring to the [official documentation.](https://playwright.dev/docs/running-tests) 

To begin, familiarise yourself with the options available for running tests by visiting Playwright's documentation https://playwright.dev/docs/running-tests.

To execute the 'smoke-test.spec.ts' individually from the terminal,  simply use the following command: `yarn playwright test smoke-test.spec.ts`.

## 📁 Structure

```sh
|- playwright-e2e
|-|- fixtures # Predefined components like page, context, browser, and browserName that you can use across different test cases.
|-|- pages # Where to keep page classes with respective locators and methods. We utilise POM (Page Object Modeling).
|-|- tests # Here is where you can do your magic. 🧙‍♂️
|-|- utils # Essential items for the framework, such as user credentials and URLs.

 playwright.config.ts # This sits outside playwright-e2e folder in the projects root. It is the config file for playwright only tests.

```
Feel free to explore and customise according to your project's needs!

