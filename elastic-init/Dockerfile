FROM ubuntu:20.04
RUN apt-get update && apt-get install -y curl
COPY wait-for-it.sh /
COPY add-index.sh /
COPY chatapp-mapping.json /
ENTRYPOINT ["/wait-for-it.sh", "-t", "0", "elasticsearch:9200", "--", "/add-index.sh"]