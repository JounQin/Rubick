#!/usr/bin/env bash

set -e

rimraf dist
yarn dll:restore
yarn env-cmd -f .prod.env yarn dll:check
yarn env-cmd -f .dev.env env-cmd -f .prod.env run-p build:server build:template build:vue:client build:vue:server
yarn dll:cache
