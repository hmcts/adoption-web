# Playwright End to End suite

End to End testing suite using:

- Playwright https://playwright.dev/
- TypeScript https://www.typescriptlang.org/

## 🤖 Starting up

For all options take a look at https://playwright.dev/docs/running-tests

To execute the 'smoke-test.spec.ts' individually from the Terminal, use the command `yarn playwright test smoke-test.spec.ts`.

## 📁 Structure

```sh
|- playwright-e2e
|-|- fixtures # With fixtures, you can group tests based on their meaning, instead of their common setup.
|-|- pages # Where to keep page classes with respective locators and methods. We utilise POM (Page Object Modeling).
|-|- settings # essential settings for the framework, such as user credentials and URLs.
|-|- tests # Here is where you can do your magic. 🧙‍♂️

 playwright.config.ts # This sits outside playwright-e2e folder, but is the config file for playwright only tests.
 .env # This sits outside playwright-e2e folder, this is required to run your tests locally. See Setup Environment Variables below.
```

## 🔐 Set up Environment Variables

This repository contains automation tests that can be run locally. To set up the environment variables for configuring URLs and passwords, follow the instructions below:

1. Create a `.env` file in the root directory of this project if it doesn't already exist.

2. Add the following environment variables to the `.env` file: (ask a team mate for the missin values or look in Azure Keyvault)

```bash
IDAM_SECRET=[ask the developers]
IDAM_TOKEN_URL=https://idam-web-public.aat.platform.hmcts.net/o/token
IDAM_TESTING_SUPPORT_USERS_URL=https://idam-testing-support-api.aat.platform.hmcts.net/test/idam/users
IDAM_CITIZEN_USER_PASSWORD=[ask the developers]
```

This file will be ignored by `git`, so it is safe to leave it there afterwards.

## User creation 

Citizen user are created on the fly using IDAM API endpoints. You can use the [idamTestApiHelper.ts](./playwright-e2e/helpers/idamTestApiHelpers.ts) to create the user. 
Remember you must be connected to the VPN to create users using the API endpoint.


3. Save the `.env` file.

`.env` files are excluded from version control using Git's .gitignore.

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
