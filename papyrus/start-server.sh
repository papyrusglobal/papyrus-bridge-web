#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT_DIR="$( dirname "${SCRIPT_DIR}" )"

# Copy Papyrus bridge web settings
cp ${SCRIPT_DIR}/papyrus-bridge-web.env ${ROOT_DIR}/.env

( cd ${ROOT_DIR} && docker-compose up -d --build )