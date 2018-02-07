#!/usr/bin/env bash

set -e

mkdir -p dist/static

{
  cp .cache/vendors.dll.manifest.json dist
  cp .cache/vendors.dll.*.js dist/static
} || {
  echo 'no cache found'
}
