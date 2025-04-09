# How to deploy without nginx

_video tutorial: https://www.youtube.com/watch?v=IbJMb-qsgaY_

### 1. Have a hetzner vps ready and firewall setup that allows ssh and http traffic on the desired port

Make sure a Firewall is attached to the server which allows:
- TCP on port 22 to allow ssh connection
- TCP on port 3000 to connect to the node process without further configurations

### 2. Prepare a public repository with the node application

### 3. log in by ssh (ssh root@<ip4>)

_optional: update vps_
- sudo apt update # get updates
- sudo apt upgrade # upgrade the updates


### 4. Install Node (Replace "18" with your desired major version)

`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`

`sudo apt install -y nodejs`

### 5. Install git (probably already installed `git -v to check`)

`sudo apt install git`

### 6. clone public repository

_for a private repository either use ssh authentication or create a personal access token for https_

`git clone https://github.com/PWadeDev/node-hetzner-manual.git`

### 7. install a process manager to manage and run the node app

`npm install -g pm2`

### 8. start the node process

`pm2 start <path-to-node-app>`

### 9. Test connection

Call `http://<ip>:3000` or `http://<ip>:3000/books` in browser or with curl to see it working!

_note_
We are utilizing the hetzner firewall cloud and not the built-in solutions from vps.
Therefore we use a simpler centralized solution that we can attach to multiple vps which will be checked on hetzners network traffic before it hits the server.

`sudo ufw status` -> should show that the internal firewall is inactive
`sudo iptables -L` -> shows which ip tables are allowed

# How to deploy with nginx

_note_
Instead of opening port 3000 in the firewall as described in step 2 we just want to open the default http port 80.

### 10. Install nginx

`sudo apt update` -> refresh list of latest available packages
`sudo apt install nginx` -> install the package

`sudo nano /etc/nginx/sites-available/nodeapp` -> create config file
 
-> paste config into nginx 
```
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
``` 

`sudo ln -s /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/nodeapp` -> sim link the file to the sites enabled folder so it will be included at nginx config

`sudo rm /etc/nginx/sites-enabled/default` -> delete default config

`sudo nginx -t` -> test config

`sudo nginx -s reload` -> reload nginx with new config

# Deploy changes of app without down time

# Not considered

## Setting up with https will not be considered since a domain would be required.

rough steps:

`sudo apt update`
`sudo apt install certbot python3-certbot-nginx` -> install certbot for nginx

`sudo certbot --nginx -d mycoolapp.com -d www.mycoolapp.com`-> get ssl certificate

`sudo certbot renew --dry-run` -> test auto renewal, otherwise cert will run out after 90 days

## Compressing data

Could be done through nginx or node. Nginx brings great features out of the box for this.