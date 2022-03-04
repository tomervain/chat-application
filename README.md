# Chat Application

## Overview
This is a javascript project made as an home exercise, aiming to deliver a chat application, using Vanilla JS for the client-side and Node.js for the server-side.

Some Details about this project:
1. The client side is rendered with **Lit Elements**, utilizing web components.
2. The client is served using an **express.js** server the manage all logics concerning transactions of chat messages and user management.
3. The client-side source code is bundeled using **Parcel**.
3. Messaging in the chat are made using Web Sockets, which are handled by **Socket.io** for convenience.
4. The chat has a chatbot (with attitude) which automatically joins the chat and interacts with all attendees whenever someone asks a question already answered before.
5. Since a chat message's question and answer are full-text entities, i decided to connect an **Elasticsearch** node to serve as a database, storing pairs of questions and answers, including the usage of an english analyzer to yield better search results.

## Running the project:

Clone the project to a local directory using `git clone`.<br/><br/>

Make sure you have **docker** (cli and engine) and **docker-compose** installed, run the following commands in your terminal:
```sh
docker --version
docker-compose --version
```

A response containing the version number of each tool is expected if everything is installed properly. This is required for initializing the application along with elasticsearch pre-configured and without additional effort.<br/><br/>

Open the project's directory in the terminal, and run:
```sh
docker-compose up -d
```

Wait for all the services to load as containers:
- **elasticsearch:** Containerized version of elasticsearch 8.0.0 with with security disabled for simplicity.
- **kibana:** Served as a utility to examine the application's "database".
- **chatapp:** The actual chat-application server, serving the client along with intializing the server-side logics.
- **elastic-init:** Utility app which runs during compose start and apply pre-defined actions to the elasticsearch's node. It is used for intializing an index for the chat application (with explicit mapping) and meant to shut-down once the process is finished.

## Access the Application:
Since you run this locally at the moment, any client can access the chat application by opening the browser and go to http://localhost:8000.

You can also access the kibana instance by going to http://localhost:5601.

### Remarks:
The application doesn't have any "browser session awareness" at the moment, so refreshing the client's page is considered a "log-out" from the chat, redirecting to the login page.