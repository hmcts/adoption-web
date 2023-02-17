# adoption-web

## Getting Started

### Prerequisites

Running the application requires the following tools to be installed in your environment:

- [Node.js](https://nodejs.org/) v12.0.0 or later
- [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com)

### Running the application

Log in to azure from the same terminal where you are going to launch the application. Run below command and follow the instructions (this is needed bacause we load secrets from `adoption-aat` while running the application locally)

```bash
az login --use-device-code
```

Connect to VPN<br>
Go to the webpage https://portal.platform.hmcts.net/ and follow the instruction to connect to F5 VPN (this is needed because we connect to APIs deployed in AAT environment while running the application locally)

Install dependencies by executing the following command:

```bash
$ yarn install
```

Bundle:

```bash
$ yarn webpack
```

Run:

```bash
$ yarn start:dev
```

The applications's home page will be available at http://localhost:3000

### Running with Docker

Create docker image:

```bash
  docker-compose build
```

Run the application by executing the following command:

```bash
  docker-compose up
```

This will start the frontend container exposing the application's port
(set to `3000` in this template app).

In order to test if the application is up, you can visit https://localhost:3000 in your browser.
You should get a very basic home page (no styles, etc.).

## Developing

### Code style

We use [ESLint](https://github.com/typescript-eslint/typescript-eslint)
alongside [sass-lint](https://github.com/sasstools/sass-lint)

Running the linting with auto fix:

```bash
$ yarn lint --fix
```

### Running the tests

This template app uses [Jest](https://jestjs.io//) as the test engine. You can run unit tests by executing
the following command:

```bash
$ yarn test
```

Here's how to run functional tests (the template contains just one sample test):

```bash
$ yarn test:routes
```

Running accessibility tests:

```bash
$ yarn test:a11y
```

Make sure all the paths in your application are covered by accessibility tests (see [a11y.ts](src/test/a11y/a11y.ts)).

### Security

#### CSRF prevention

[Cross-Site Request Forgery](https://github.com/pillarjs/understanding-csrf) prevention has already been
set up in this template, at the application level. However, you need to make sure that CSRF token
is present in every HTML form that requires it. For that purpose you can use the `csrfProtection` macro,
included in this template app. Your njk file would look like this:

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

#### Helmet

This application uses [Helmet](https://helmetjs.github.io/), which adds various security-related HTTP headers
to the responses. Apart from default Helmet functions, following headers are set:

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

## Testing:

E2E tests are configured to run in parallel in 5 headless browsers by default.

To run e2e tests enter `yarn test:local` in the command line.

### Optional configuration

To run all tests only in one browser please set `PARALLEL_CHUNKS` environment variable to `1`. By default 5 chunks are enabled.

```$bash
PARALLEL_CHUNKS=1 yarn test:local
```

To show tests in browser window as they run please set `SHOW_BROWSER_WINDOW` environment variable to `true`. By default browser window is hidden.

```$bash
SHOW_BROWSER_WINDOW=true yarn test:local
```

To disable chrome web security

```$bash
DISABLE_SECURITY=true yarn test:local
```

## Running E2E against AAT environment

```$bash
ADOP_WEB_URL=https://adoption-web.aat.platform.hmcts.net/ SHOW_BROWSER_WINDOW=false CITIZEN_PASSWORD=Adoption12 yarn test:local --grep 'Verify apply my own option'
```

## Running E2E against PR enviroment

```$bash
ADOP_WEB_URL=https://adoption-web-pr-146.service.core-compute-preview.internal/ SHOW_BROWSER_WINDOW=false CITIZEN_PASSWORD=Adoption12 yarn test:local --grep 'Verify apply my own option'
```

test
