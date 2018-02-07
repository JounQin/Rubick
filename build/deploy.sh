#!/usr/bin/env bash

git pull
yarn run prune
yarn sync:pull
{
  pm2 restart rubick
} || {
  yarn pm2
}
