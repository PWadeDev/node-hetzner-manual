# How to deploy

_video tutorial: https://www.youtube.com/watch?v=IbJMb-qsgaY_

### 1. Have a vps ready

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
