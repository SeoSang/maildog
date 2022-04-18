#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/maildog

cd "$REPOSITORY/web"
pm2 start pm2.config.js

yes | sudo cp "$REPOSITORY/nginx.conf" /etc/nginx/nginx.conf

if [ -f /var/logs/nginx.pid ]; then
  sudo nginx -s reload
else
  sudo nginx
fi
