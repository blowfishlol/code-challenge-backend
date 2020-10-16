# Socket Calculator Server

This server will receive a connection established with [socket.io](https://socket.io/) from the
[client](https://github.com/blowfishlol/code-challenge-frontend)

This project requires [mongoDB](https://www.mongodb.com/) installed in the system. The name
of the database may be changed in .env and the collection name should be ```history```

The configuration of the server will be loaded from .env file. 

*.env.template is provided*

## Possible Messages

### Mathematical expression
When the client sends a valid mathematical expression, the server should calculate it. 
The expression will be validated then will be calculated using [math.js](https://mathjs.org/)
The possible operators are:
- \+ Addition
- \- Substraction
- \* Multiplication
- \/ Divison
- ^ Power
- % Modulo

Every successful calculation will be stored in a mongodb database defined in the .env file.

If it is an invalid mathematical expression, the server will reject the request.

### history
The client may send ```history``` message, and the server will get the top 10 latest
successful operations performed by the user and send it back to the client.

## Available Scripts

### ```npm run start```
This will run the server instance with nodemon. If unconfigured, it will run on the port 5000.

### ```npm run test```
This will run the unit testing of the calculation functions and the validation functions
of the server.