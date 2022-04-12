#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/maildog

pm2 start "$REPOSITORY/web/pm2.config.js"

yes | sudo cp "$REPOSITORY/nginx.conf" /etc/nginx/nginx.conf

nginx -s reload
