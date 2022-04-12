#!/bin/sh

sudo mkdir /var/logs

sudo mkdir -p /var/logs/maildog
sudo touch /var/logs/nginx.pid
sudo touch /var/logs/maildog/error.log

sudo apt update
sudo apt install nginx
yes | sudo cp ../../nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart