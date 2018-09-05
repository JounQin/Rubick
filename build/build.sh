#!/usr/bin/env bash

rimraf dist
yarn dll:restore
env-cmd .prod.env yarn dll:check
env-cmd .dev.env env-cmd .prod.env run-p build:server build:template build:vue:client build:vue:server
yarn dll:cache
