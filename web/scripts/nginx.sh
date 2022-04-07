#!/bin/sh

sudo apt update
sudo apt install nginx
yes | cp ../nginx.conf /etc/nginx/nginx.conf  