#!/usr/bin/env bash

REPOSITORY=/home/ubuntu
PROJECT_DIR=maildog

if [ -d "$REPOSITORY/$PROJECT_DIR/" ]; then
    rm -rf "$REPOSITORY/$PROJECT_DIR/"
fi
mkdir -vp $REPOSITORY/$PROJECT_DIR/
