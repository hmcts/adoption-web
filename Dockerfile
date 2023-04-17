# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:16-alpine as base


# ---- Build image ----
FROM base as build
USER root
RUN corepack enable
USER hmcts
COPY --chown=hmcts:hmcts . .
RUN ls -a
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=true yarn install && yarn cache clean && yarn build:prod

# ---- Runtime image ----
FROM base as runtime
COPY --from=build . . 

EXPOSE 3000

