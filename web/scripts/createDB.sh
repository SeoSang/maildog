#!/bin/sh

sudo apt install sqlite3 

sudo mkdir -p /var/tmp
sudo touch /var/tmp/prod.sqlite3 
sudo chmod 755 /var/tmp/prod.sqlite3
sudo chmod u+w /var/tmp
sudo chown -R user /var/tmp/prod.sqlite3


npm install -g cross-env ts-node
DB_PATH=/var/tmp/prod.sqlite3 
NODE_ENV=production 
npx ts-node '../server/db/createScript.ts'