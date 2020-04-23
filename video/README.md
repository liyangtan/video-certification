# Video Tutorial

#### _This tutorial has two parts: A server part and a client part_

## Server

This server is written in JavaScript using the [Express framework](https://expressjs.com/)

For the documentation please visit TB guide for [Node](https://tokbox.com/developer/sdks/node/)

You'll need to complete 4 steps to complete this tutorial. Once completed, your server will be able to:

1. Generate a session
2. Generate tokens for the session
3. Receive the session events
4. Whatever you add to it!

The server skeleton is located in ./application_server and the steps you need to complete are in routes/tkbx.js and routes/events.js.

To begin, install the server:

`npm i`

To run the server:

`npm run start`

By default the server uses port 3000.

**NOTE**: The server will only create one session per run, which means that all clients that fetch the session will be connected to the same one. This will enable you see yourself from two different clients.

You can test your server using [Postman](https://www.getpostman.com/) or [cURL](https://help.ubidots.com/en/articles/2165289-learn-how-to-install-run-curl-on-windows-macosx-linux)

To expose your server to the outside world, we recommend using [ngrok](https://ngrok.com/).

Good Luck!

## Client

Please follow this [tutorial](https://tokbox.com/developer/tutorials/web/basic-video-chat/) with the following changes:

1. Your API_KEY should be hardcoded, and can be retrieved from the dashboard
2. Session and token should be generated using the server you've just built. Use this [article](https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/#jquery-methods) for a quick explantation on how to do HTTP requests, the project already contains Ajax support. The flow should be-

   i. Create session

   ii. Create token

   iii. Initlialize session locally

3. Complete the rest of the tutorial as described

In the end you should be able to perform a one participant video session and see yourself.

The skeleton for the tutorial is already in the web_client dir!

Good Luck!
