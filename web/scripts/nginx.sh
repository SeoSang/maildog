#!/bin/sh

sudo apt update
sudo apt install nginx
yes | sudo cp ../nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart  