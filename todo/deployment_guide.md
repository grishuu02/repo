# Deployment Guide: Cloud-Based To-Do List Manager MERN App

## Aim

Deploy a cloud-based full-stack To-Do List Manager application on an AWS EC2 instance. The application allows users to create, update, complete, and delete tasks. Task records are stored in a MongoDB backend database.

## Software Used

- AWS EC2 Ubuntu instance
- Node.js
- MongoDB
- Nginx
- React + Vite
- Express.js

## Step 1: Connect to EC2

```bash
ssh -i ~/new.pem ubuntu@YOUR_PUBLIC_IP
```

## Step 2: Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
cd cc_cloud_todo_manager
```

## Step 3: Install Server Requirements

```bash
sudo apt-get update -y
sudo apt-get install -y curl gnupg nginx build-essential

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --batch --yes -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update -y
sudo apt-get install -y mongodb-org
sudo systemctl enable --now mongod
```

## Step 4: Install Project Dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Step 5: Build Frontend

```bash
npm run build --prefix frontend
```

## Step 6: Configure Nginx

```bash
sudo rm -f /etc/nginx/sites-enabled/*
sudo nano /etc/nginx/sites-available/mern
```

Paste this:

```nginx
server {
    listen 80;
    server_name _;

    root /home/ubuntu/cc_cloud_todo_manager/frontend/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri /index.html;
    }
}
```

Enable and restart Nginx:

```bash
sudo ln -sf /etc/nginx/sites-available/mern /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 7: Start Backend

```bash
cd backend
npm start
```

## Step 8: Open Website

Open your EC2 Public IPv4 address:

```text
http://YOUR_PUBLIC_IP
```

## AWS Security Group Required Rule

Add this inbound rule:

```text
Type: HTTP
Port: 80
Source: 0.0.0.0/0
```

Keep SSH rule also enabled:

```text
Type: SSH
Port: 22
Source: My IP
```

## Result

The To-Do List Manager was successfully deployed on the cloud. Users can create, view, update, and delete tasks through the web interface, and all task data is stored in MongoDB.
