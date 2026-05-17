#!/bin/bash
set -e
sudo apt-get update -y
sudo apt-get install -y curl gnupg nginx build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --batch --yes -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update -y
sudo apt-get install -y mongodb-org
sudo systemctl enable --now mongod
npm install --prefix backend
npm install --prefix frontend
npm run build --prefix frontend
