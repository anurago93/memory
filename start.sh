#!/bin/bash

export PORT=5110

cd ~/www/memory
./bin/memory stop || true
./bin/memory start

