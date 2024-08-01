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
cd derbel-api
npm install
echo "APP_PORT=3000" > .env
echo "CORS_ORIGINS=http://localhost:8080" >> .env
echo "COOKIE_SECRET=hg1jm2gf12jhg" >> .env
echo "PASSWORD_ROUNDS=10" >> .env
echo "JWT_SECRET=jhghf234gf3" >> .env
echo "JWT_EXPIRES_IN=1h" >> .env
echo "DATABASE_HOST=derbel-postgres" >> .env
echo "DATABASE_MIGRATION_HOST=localhost" >> .env
echo "DATABASE_PORT=5432" >> .env
echo "POSTGRES_DB=derbel" >> .env
echo "POSTGRES_USER=derbel" >> .env
echo "POSTGRES_PASSWORD=derbel" >> .env
echo "PGADMIN_DEFAULT_EMAIL=fake@email.com" >> .env
echo "PGADMIN_DEFAULT_PASSWORD=123" >> .env
echo "PGADMIN_LISTEN_PORT=3300" >> .env
echo "REDIS_URL=redis://derbel-redis:6379" >> .env
docker compose up
```

Run derbel-app

```bash
cd derbel-app
npm install
npm run dev
```

## Architecture

### Text messaging

For every pair of users is registered a contact. Both users have access to the contact, through which a room is created
whenever one of them becomes online. Users are then joined to the room when opening a contact, able to send messages to then room and notified of new messages through WebSockets when online. In case if not present, users are able to see the
latest messages later in time, since the application stores all messages and fetches the thems corresponding to the contact.
 
### Initiating a meeting
 
When a user initiate a meeting, data is store in the database stating that a ongoing meeting exists for both users.
The called user then can be notified in real-time through websockets, but in case if he/she is not online, the
application will know when there is a meeting in place by checking the meeting data stored in the database, whenever
refreshing the page.

### Video streaming

By leveraging WebRTC, users can communicate by streaming their video cameras between each other directly without communicating to the server. Communication to the server occours only through WebSockets to notify meeting requests and ending or leaving a call.

### Scaling WebSockets Servers

The socket.io project enables a easy horizontal scaling of websockets servers by leveraging the pub/sub mechanism of
redis. For each connection between a client and a websocket server, a "socket" is stored in the connected server.
Communication between different users happenned by identifing those sockets sending data to them. When horizontally 
scaling, we have multiple servers holding their own sockets privately. In order to make contact between users of sockets
from different servers, the application must leverage a socket.io adapter that makes those sockets known between the
different servers, which is possible by redis through the pub/sub mechanism.

