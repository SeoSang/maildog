#!/bin/sh


sudo rm /usr/bin/node
sudo ln -s /home/ubuntu/.nvm/versions/node/v17.9.0/bin/node /usr/bin/node

sudo rm /usr/bin/pm2
sudo ln -s /home/ubuntu/.nvm/versions/node/v17.9.0/bin/pm2 /usr/bin/pm2

mkdir /var/log/maildog
sudo curl -fsSL https://get.pnpm.io/install.sh | PNPM_VERSION=7.0.0-rc.2 sh -
../pnpm install


