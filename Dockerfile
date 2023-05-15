# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:16-alpine as base
USER root
RUN corepack enable
COPY --chown=hmcts:hmcts . .

# ---- Build image ----
FROM base as build
USER hmcts
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=true yarn install && yarn build:prod

# ---- Runtime image ----
FROM base as runtime
COPY --from=build $WORKDIR/src/main ./src/main

EXPOSE 3000

