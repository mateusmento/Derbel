## Derbel

![Screenshot](https://raw.githubusercontent.com/mateusmento/derbel/main/assets/derbel.png)

Derbel is a virtual meeting app to connect with people online. Meet and communicate with people via video conferences and text messaging.

This project demonstrates skills in creating:
- Real-time communication with WebSockets and WebRTC
- Accessing user's camera and microphone with MediaStream API
- Hortizontal scaling and load balancing of websocket servers with Redis and Traefik
- Web apps using Vue 3 with TypeScript and Web Standards
- Complex UI with HTML and CSS
- RESTful and WebSocket API's with Node.js, Nest.js and Socket.io

## Running the app

Make sure to install dependencies with `npm install` and having docker engine in your system.

Run derbel-api

```bash
$ cd derbel-api
$ npm install
$ docker compose up
```

Run derbel-app

```bash
$ cd derbel-app
$ npm install
$ npm run dev
```
