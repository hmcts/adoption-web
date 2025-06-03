# adoption-web

## Getting Started

### Prerequisites

Running the application requires the following tools to be installed in your environment:

- [Node.js](https://nodejs.org/) v12.0.0 to 18.15.0, 22.15.0
- [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/)

Request the following files from a colleague:
- .env
- config/local.yaml

### Running the application

Ensure the prerequisites are met.

#### Running the application for the first time

- _(Optional)_ Install Redis:<br>
  This provides CLI tools for monitoring and changing the cache during the LA journey.

```bash
   brew install redis
```

- Connect to F5 VPN:<br>
  Go to the webpage https://portal.platform.hmcts.net/ and follow the instructions to connect to F5 VPN.  Once the F5 scan has taken place and you are taken to the F5 landing page, **make sure you click the VPN button** to actually start the VPN.<br>
  (This is needed because we connect to APIs deployed in the AAT environment while running the application locally.)

  Warning: You may need to **disconnect from the GlobalConnect VPN** as it can conflict. The F5 VPN will then appear to be working but you'll be unable to access idam, etc. Example error:
  `[service-auth-token] Error in refreshing service auth token  getaddrinfo ENOTFOUND rpe-service-auth-provider-aat.service.core-compute-aat.internal undefined`

- Log in to Azure:<br>
  Use the terminal where you are going to launch the application from. Run the Azure CLI command below and follow the instructions. When prompted in the terminal, enter the number corresponding to the subscription named `DCD-CNP-DEV` (the tenant should always be `CJS Common Platform`).<br>
  (This is needed because we load secrets from `adoption-aat` while running the application locally.)

```bash
   az login --use-device-code
```

- Run a local version of Draft Store in a Docker container with a Redis image:

```bash
   docker-compose -f ./draft-store.yml up -d
```

- Comment out code that isn't used when running Draft Store locally:<br>
  Go to the file `src/main/modules/draft-store/index.ts` and comment out like this:

```typescript
const client = new Redis({
  host: config.get('services.draftStore.redis.host'),
  port: config.get('services.draftStore.redis.port'),
  /* password: config.get('session.redis.key'),
      tls: {
        servername: config.get('services.draftStore.redis.host'),
      }, */
});
```

Remember to uncomment this code before you commit any changes.

- Install dependencies:

```bash
   yarn install
```

> ##### Troubleshooting:
>
> Node Sass installation issues are generally because Python 3.12+ doesn't include distutils.  The replacement is setuptools:
>
> ```bash
> brew install python-setuptools
> ```
>
> If you have other issues check your Node version and use Node Version Manager to change to a supported version if required:
>
> ```bash
> nvm use 22.15.0
> ```

- Bundle:

```bash
   yarn webpack
```

- Run:

```bash
   yarn start:dev
```

- The application's home page will be available at http://localhost:3001. This will redirect to the IDAM log-in page in AAT.  Use the test account with e-mail address `test-citizen-dc5@mailinator.com` and password `Password12` to log in as a Citizen user.<br>
If you see a message saying "As you've not logged in for at least 90 days, you need to reset your password." then you need to recreate the test account using `curl` as follows:

```bash
   curl --location 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts' \
   --header 'Content-Type: application/json' \
   --data-raw '{
     "email": "test-citizen-dc5@mailinator.com",
     "forename": "Test",
     "surname": "Citizen",
     "password": "Password12",
     "roles":
       [
         { "code": "citizen" }
       ]
     }'
```

#### Running the application subsequently

- Connect to F5 VPN

- Start the Docker container

- Run:

```bash
   yarn start:dev
```

## Developing

### Code style

We use [ESLint](https://github.com/typescript-eslint/typescript-eslint)
alongside [sass-lint](https://github.com/sasstools/sass-lint)

Running the linting with auto-fix (don't do this unless you are planning to submit your code-changes aftewards):

```bash
$ yarn lint --fix
```

### Running the tests

This template app uses [Jest](https://jestjs.io//) as the test engine. You can run unit tests by executing the following command:

```bash
$ yarn test
```

**NOTE** - the OIDC integration tests may fail locally, unless you create a `config/local.yaml` file with the content:

```
mockData:
  authToken: 'VALUE_FROM_AAT_KEYVAULT'
```

(This file will be ignored by `git`, so it is safe to leave it there afterwards.)  Replace `VALUE_FROM_AAT_KEYVAULT` with the contents of the secret `adoption-web-auth-token` found in `adoption-aat`.

Functional and accessibility tests are now run using Playwright as [described below](README.md#testing-e2e---playwright).

Make sure all the paths in your application are covered by accessibility tests (see [a11y.ts](src/test/a11y/a11y.ts)).

### Security

#### CSRF prevention

[Cross-Site Request Forgery](https://github.com/pillarjs/understanding-csrf) prevention has already been set up in this template, at the application level. However, you need to make sure that CSRF token is present in every HTML form that requires it. For that purpose you can use the `csrfProtection` macro, included in this template app. Your `.njk` file would look like this:

```
{% from "macros/csrf.njk" import csrfProtection %}
...
<form ...>
  ...
    {{ csrfProtection(csrfToken) }}
  ...
</form>
...
```
##### Fortify Scan
The Fortify scan is run in the nightly pipeline. See [Fortify Scan Setup Confluence page](https://tools.hmcts.net/confluence/display/DATS/1C+-+Fortify+Scan+Setup+in+nightly+pipelines) for more details on how to set this up.

#### Helmet

This application uses [Helmet](https://helmetjs.github.io/), which adds various security-related HTTP headers to the responses. Apart from default Helmet functions, following headers are set:

- [Referrer-Policy](https://helmetjs.github.io/docs/referrer-policy/)
- [Content-Security-Policy](https://helmetjs.github.io/docs/csp/)

There is a configuration section related with those headers, where you can specify:

- `referrerPolicy` - value of the `Referrer-Policy` header

Here's an example setup:

```json
    "security": {
      "referrerPolicy": "origin",
    }
```

Make sure you have those values set correctly for your application.

### Healthcheck

The application exposes a health endpoint (https://localhost:3000/health), created with the use of
[Nodejs Healthcheck](https://github.com/hmcts/nodejs-healthcheck) library. This endpoint is defined
in [health.ts](src/main/routes/health.ts) file. Make sure you adjust it correctly in your application.
In particular, remember to replace the sample check with checks specific to your frontend app,
e.g. the ones verifying the state of each service it depends on.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Testing E2E - Playwright

We use Playwright with TypeScript. All the details can be found in the [E2E README.md](./playwright-e2e/README.md).

To install Playwright: `yarn playwright install`.

You then need to create a root-level `.env` file with the following information (to be provided by the developers):

```bash
IDAM_SECRET=[ask the developers]
IDAM_TOKEN_URL=https://idam-web-public.aat.platform.hmcts.net/o/token
IDAM_TESTING_SUPPORT_USERS_URL=https://idam-testing-support-api.aat.platform.hmcts.net/test/idam/users
IDAM_CITIZEN_USER_PASSWORD=[ask the developers]
```

This file will be ignored by `git`, so it is safe to leave it there afterwards.

To run Playwright tests, use command `yarn playwright test`.  Note that these take about 15 minutes to run in total.

### Old tests

E2E tests were configured to run in parallel in 5 headless browsers by default.

To run old E2E tests, enter `yarn test:local` in the command line.  However, be warned that these may no longer work.

### Optional configuration

To run all old tests only in one browser please set `PARALLEL_CHUNKS` environment variable to `1`. By default 5 chunks are enabled.

```$bash
PARALLEL_CHUNKS=1
yarn test:local
```

To show old tests in browser window as they run please set `SHOW_BROWSER_WINDOW` environment variable to `true`. By default browser window is hidden.

```$bash
SHOW_BROWSER_WINDOW=true
yarn test:local
```

To disable chrome web security

```$bash
DISABLE_SECURITY=true
yarn test:local
```

### Running E2E against AAT environment

```$bash
ADOP_WEB_URL=https://adoption-web.aat.platform.hmcts.net/ SHOW_BROWSER_WINDOW=false CITIZEN_PASSWORD=Adoption12
yarn test:local --grep 'Verify apply my own option'
```

### Running E2E against PR enviroment

```$bash
ADOP_WEB_URL=https://adoption-web-pr-146.service.core-compute-preview.internal/ SHOW_BROWSER_WINDOW=false CITIZEN_PASSWORD=Adoption12
yarn test:local --grep 'Verify apply my own option'
```

### Step controllers

`src/main/app/controller` contains default controllers. These will be used if no controllers are specified alongside content in the steps folders.<br>
If a step needs additional functionality, add a controller alongside the content.ts, which inherits the default controller. Get and post controllers need 'get' or 'post' in their filenames.
