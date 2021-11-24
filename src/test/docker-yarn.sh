#!/usr/bin/env bash

# Disable exit on non 0
set +e

yarnCmd=$1
userId=$2

yarn $yarnCmd
status=$?

chown -R $userId:$userId functional-output

exit $status
