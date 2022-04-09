#!/bin/sh

sudo mkdir /var/logs
sudo touch /var/logs/nginx.pid

sudo apt update
sudo apt install nginx
yes | sudo cp ../../nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart