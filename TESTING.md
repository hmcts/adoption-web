# Testing process

- [Testing process](#testing-process)
  - [Generating users](#generating-users)
    - [Generating a user with a complete unsubmitted case](#generating-a-user-with-a-complete-unsubmitted-case)
    - [Viewing the complete happy path](#viewing-the-complete-happy-path)
    - [Generating an applicant 1 user with a joint complete unsubmitted case](#generating-an-applicant-1-user-with-a-joint-complete-unsubmitted-case)
    - [Generating an applicant 2 user with a joint linked complete unsubmitted case](#generating-an-applicant-2-user-with-a-joint-linked-complete-unsubmitted-case)
  - [Checking that the API and frontend are in sync](#checking-that-the-api-and-frontend-are-in-sync)
  - [Unit tests](#unit-tests)
  - [Functional tests](#functional-tests)
  - [Cross browser tests](#cross-browser-tests)

## Generating users

Connect to the VPN and run: `DEBUG=axios yarn start:dev`

### Generating a user with a complete unsubmitted case

1. Open `src/test/functional/features/pay-your-fee.feature` and change `And I click "Continue to payment"` to `And I click "Stop here"`
2. In another terminal run `yarn test:cucumber:grep "Continuing to payment"`
3. A browser will open and setup the case and will stop just before continuing to payment to allowing you check any of the pages from the check your answers so far page

### Viewing the complete happy path

1. Copy `src/test/cross-browser/features/happy-path.feature` to `src/test/functional/features/happy-path.feature`
2. In another terminal run `yarn test:cucumber:grep "Successfully submitting a no fault union dissolution application"`

### Generating an applicant 1 user with a joint complete unsubmitted case

1. Open `src/test/functional/features/joint-check-your-answers.feature` and change `Then the page should include "Your answers will be sent ...` to `Then the page should include "Stop here"`
2. In another terminal run `yarn test:cucumber:grep "Checking completed answers as a joint applicant"`
3. A browser will open and setup the case and will stop just before submitting for their partner to allowing you check any of the pages from the check your answers so far page

### Generating an applicant 2 user with a joint linked complete unsubmitted case

1. Open `src/test/functional/features/applicant2/enter-your-access-code.feature` and change `Then the page should include "You need to review your joint application"` to `Then the page should include "Stop here"`
2. In another terminal run `yarn test:cucumber:grep "They have entered the correct case reference"`
3. A browser will open and setup the case and will stop just after linking applicant 1 case to applicant 2 to allowing you check any of the pages from the check your answers so far page

## Checking that the API and frontend are in sync

1. Install `adoptopenjdk11` from brew/apt etc.
2. Checkout `git@github.com:hmcts/nfdiv-case-api.git`
3. Run `./gradlew generateTypeScript` to generate `build/ts/index.ts`
4. Checkout `git@github.com:hmcts/nfdiv-frontend.git`
5. Copy `nfdiv-case-api/build/ts/index.ts` to `nfdiv-frontend/src/main/app/case/definition.ts`
6. Run `yarn lint` to show any data mismatches between the frontend and backend

## Unit tests

Unit tests are written in Jest and can be started by running `yarn test`.

Code coverage is set at 90% and is reported by Sonar.

## Functional tests

Functional tests are written in Cucumber syntax with Codecept running them against their step implementations.

Tests locally are run via Playwright/Puppeteer using Chromium on Jenkins these run inside of a Docker container.

Testing error conditions, edge cases, more complex or lengthy functional tests are marked with `@nightly` which will run in the nightly 4am job

Tests can be marked as `@flaky` to skip them if they're failing and require fixing.

- Running all tests `yarn test:cucumber` (including `@nightly`)
- Running `master` and branch tests `yarn test:e2e`

## Cross browser tests

Happy path cross browser tests are written in Cucumber syntax with Codecept running them against their step implementations.

These are run via Playwright - Chrome/Edge, Safari and Firefox and SauceLabs in Windows 10 and Microsoft Edge.

Running cross browser tests locally, start the server then run:

`TEST_HEADLESS=false yarn test:crossbrowser:playwright`

See [`README.md`](README.md) for more information on testing and connecting to SauceLabs.
