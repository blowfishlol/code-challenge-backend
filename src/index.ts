import 'dotenv/config'
import mongo from "./services/mongo"
import express, {Express} from "express"
import socketio, {Socket} from "socket.io"
import Message from "./models/Message";
import {addMessageEventHandlerToSocket, generateResponse} from "./socketHandlers/messageHandler";


const port = process.env.PORT || 5000

async function main() {
    await mongo.init()

    const app : Express = express()
    let httpserver = require("http").Server(app)
    let io = socketio(httpserver)

    io.on("connection", (socket: Socket) => {
        console.log("a user connected");

        addMessageEventHandlerToSocket(socket);

    });

    httpserver.listen(port, () => {
        console.log(`Listening on ${port}`);
    });


}



main().catch((err) =>{
    console.error(err)
})