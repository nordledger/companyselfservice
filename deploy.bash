#!/bin/bash

set -e
set -u

# The remote server we are copying the files using ssh + public key authentication
REMOTE="demo.nordledger.com"



# Build dist folder using webpack
npm run build

# Copy local dist folder to the remote server Nginx folder over sudoed
# https://crashingdaily.wordpress.com/2007/06/29/rsync-and-sudo-over-ssh/
rsync -a -e "ssh" --rsync-path="sudo rsync" "dist/*" --chown www-data:www-data $REMOTE:/usr/share/nginx/html


