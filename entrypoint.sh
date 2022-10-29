#!/usr/bin/env sh

echo "window.env = '${appenv}'" > env.js

exec serve -p 8080 -s .
