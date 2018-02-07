#!/usr/bin/env bash

rimraf dist
yarn dll:restore
env-cmd .env yarn dll:check
env-cmd --fallback .env.local env-cmd .env run-p build:server build:template build:vue:client build:vue:server
yarn dll:cache
