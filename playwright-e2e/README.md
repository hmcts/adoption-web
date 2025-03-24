# Playwright End to End suite

End to End testing suite using:

- Playwright https://playwright.dev/
- TypeScript https://www.typescriptlang.org/

## Brief Introduction

This application uses Playwright.ts as both a test runner, and framework, and node.js as a runtime environment. It makes use of axe-core
accessibility tools, and does not require a SauceLabs tunnel or subscription to run in crossbrowser mode. The tests ar set to run concurrently,
this cam be alter in the Playwright.config.ts file, a well as timeouts and other small changes. Note these changes are global, any local changes
should be used cautiously and within reason. 

It is worth noting that the parameter settings in the Jenkinsfiles can override environment variables including the prameters set by the Playwright.config.ts
file.

TypeScript is used to call functions and query the Playwright API, and follow the strict type declarations. no.js files should appear in this repository as
.js is disabled. You can run .py files, however, it is urged to not create .py files and to write any test functions which query the Playwright API in
TypeScript.

Should you wish to contribute to this project, please reach out to the Adoptions team for permissions.

The architecture is as follows:

                    ┌──────────────────┐
                    │                  │
                    │      Tests       │
                    │                  │
                    └────────▲─────────┘
                             │
                             │
                    ┌──────────────────┐
                    │                  │
                    │     Journeys     │
                    │                  │
                    └────────▲─────────┘
                             │
                             │
                    ┌────────────────┐
                    │                │
              ┌─────►      Pages     ◄─────┐
              │     │                │     │
              │     └────────────────┘     │
              │                            │
      ┌───────┴───────────┐        ┌───────┴───────┐
      │                   │        │               │
      │     Locators      │        │    Content    │
      │                   │        │               │
      └───────────────────┘        └───────────────┘

## Requirements

To run the application on your machine/environment, please ensure you have the following:

NodeJS>v22.0.0

## Running the application locally.

Please install the dependencies with the following cmd:

` yarn setup `
` yarn setup-env `
` yarn install`

This will run the custom script found in the package.json file, please read and analyse accordingly.

Should you wish to run a test locally without a commandline, use Aqua if you are using IntelliJ, or use the Playwright plugin on VS Code; you can press the green play button
against any of the tests defined in ___test.ts. Should you wish to run in headed mode, you can seelct this to run in your plugin's configuration file or UI. Alternatively, you can
run this test or a group of tests via CLI and run the following command `--project chromium --headed`. This runs a test in Chromium, whilst headed. If you want a specific test to be done
in a specific build or emulator, then you will need to import and refernce this in the `playwright.config.ts` file.

## Jenkins configuration

Should you wish to run the pipeline, you can do so by accessing it in Jenkins, and if you wish to run it against a specific URL, for example, a PR branch, the "Build with parameters" is
configured to allow you to do so, as well as skip certain applications being tested.

## Test Tagging Guidelines

Adoptions uses the following test tags to cateogry and manage the test suites:
   - `@nightly`: For tests to be included in the nightly pipeline.
   - `@smoke`: For tests to be included in the master pipeline.
   - `@regression`: For tests should only be run as part of major regression testing (e.g.. releases or significant changes).
   - `@accessibility`: For tests utilising axe-core to check accessibility.
   - `@errorMessage`: For tests that trigger and verify error messages

## Tagging Rules

1. General Tagging:
   - Tag all tests with `@regression`, unless the test is specifically for accessibility.
2. Nightly Pipeline Tests:
   - Identify tests for `@nightly`.
3. Accessibility Tests:
   - Add accessibility tag `@accessibility` for tests that are run in nightly.
4. Smoke Tests:
   - For critical path tests that ensure key functionality is operational, tag them with `@smoke` for inclusion in the master pipeline.
5. Error Message Validation
   - Tests designed to validate errorr messages should be tagged with `@errorMessage`. These tpyically would not be run as part of the
   nightly pipeline

## Note
- Each test can have multiple tags if it fits into more than one category.
- Regularly review test tagging to maintain a well-organised and efficient test suite.

## Virtual Testing
Virtual testing in Playwright is the process of comparing an expected screenshot of the page with the actual screenshot of the page.
However, there are a few thing to consider when using virtual tests.

##  Which features to visual test?
Visual tests are better focused on features that are difficult to automate, where the UUI is not consistently changing or where teh UI is
considered critical to the usage of the service.

## Handling dynamic data
Your feature may have dynamic data that could skew visual testing results, fortunately you can use the following options in `toHaveScreenshot()` to mitigate this.

- `clip` - This will choose a select area to screenshot. Useful if you do want to test the whole page.
- `mask` - This will mask a given locator(s) and be exempt from the comparison test.
- `maxDiffPixelRatio` - This is  the ratio of pixels that can be different, likewise `maxDiffPixels` can be used to provide a number of pixels rather than ratio.


## 🤖 Starting up

For all options take a look at https://playwright.dev/docs/running-tests

To execute the 'smoke-test.spec.ts' individually from the Terminal, use the command `yarn playwright test smoke-test.spec.ts`.

## 📁 Structure
```sh
|- playwright-e2e
|-|- fixtures # With fixtures, you can group tests based on their meaning, instead of their common setup.
|-|- pages (TO BE REDACTED)# Where to keep page classes with respective locators and methods. We utilise POM (Page Object Modeling).
|-|- settings # essential settings for the framework, such as user credentials and URLs.
|-|- tests # Here is where you can do your magic. 🧙‍♂️

 playwright.config.ts # This sits outside playwright-e2e folder, but is the config file for playwright only tests.
 .env # This sits outside playwright-e2e folder, this is required to run your tests locally. See Setup Environment Variables below.
```

## 🔐 Setup Environment Variables

This repository contains automation tests that can be run locally. To set up the environment variables for configuring URLs and passwords, follow the instructions below:

1. Create a .env file in the root directory of this project if it doesn't already exist.

2. Add the following environment variables to the .env file: (ask a team mate for details/values can be found in Azure Keyvault)

   IDAM_SECRET=
   IDAM_TOKEN_URL=
   IDAM_TESTING_SUPPORT_USERS_URL=
   IDAM_START_PAGE=
   IDAM_CITIZEN_USER_PASSWORD=


## User creation 

Citizen user are created on the fly using IDAM API endpoints. You can use the [idamTestApiHelper.ts](./playwright-e2e/helpers/idamTestApiHelpers.ts) to create the user. 
Remember you must be connected to the VPN to create users using the API endpoint.


3. Save the .env file.

.env file is excluded from version control using Git's .gitignore.

## Install Dependencies

Before running the automation tests, ensure that all necessary dependencies are installed. You can do this by running:

```
yarn install
```

## Running Tests

Once the environment variables are configured and dependencies are installed, you can run the automation tests using the following command:
```
yarn playwright test smoke-test.spec.ts
```

## 🎬 Debugging

Playwright provides a couple of great debugging capabilities at all levels. The ones that you will probably find most useful are:

For all options take a look at https://playwright.dev/docs/debug
