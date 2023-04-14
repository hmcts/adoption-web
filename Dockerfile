# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:16-alpine as base
COPY --chown=hmcts:hmcts . .
RUN yarn set version berry
RUN yarn install \
  && yarn cache clean

# ---- Build image ----
FROM base as build
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=true yarn install && yarn build:prod

# ---- Runtime image ----
FROM base as runtime
RUN rm -rf webpack/ webpack.config.js
COPY --from=build . . 

EXPOSE 3000
