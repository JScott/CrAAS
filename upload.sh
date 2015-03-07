#!/usr/bin/env bash

zip -r package.zip node/

# aws lambda upload-function \
#    --region us-west-2 \
#    --function-name CrAAS  \
#    --function-zip $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/package.zip \
#    --role arn:aws:iam::356671443308:role/executionrole ???  \
#    --mode event \
#    --handler lambda.handler \
#    --runtime nodejs \
#    --debug \
#    --profile adminuser ??? \
#    --timeout 10 \
#    --memory-size 1024
