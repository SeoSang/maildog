#!/usr/bin/env bash

pm2 start web/pm2.config.js

yes | sudo cp ../nginx.conf /etc/nginx/nginx.conf

nginx -s reload
