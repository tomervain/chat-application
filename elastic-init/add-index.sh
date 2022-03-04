#!/bin/bash

if curl elasticsearch:9200; then
    curl -XPUT "elasticsearch:9200/chatapp" -H 'Content-Type: application/json' -d @chatapp-mapping.json;
fi