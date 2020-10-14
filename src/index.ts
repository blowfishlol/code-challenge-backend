import 'dotenv/config'
import mongo from "./services/mongo"
import express, {Express} from "express"
import socketio, {Socket} from "socket.io"
import Message from "./models/Message";
import {generateResponse} from "./socketHandlers/messageController";


const port = process.env.PORT || 5000

async function main() {
    await mongo.init()

    const app : Express = express()
    let httpserver = require("http").Server(app)
    let io = socketio(httpserver)

    io.on("connection", (socket: Socket) => {
        console.log("a user connected");

        socket.on("message", (message : Message) =>{
            generateResponse(message)
                .then(messages=>{
                    socket.emit("response", messages)
                })
                .catch(err=>{
                    console.error(err.message)
                    socket.emit("response", [new Message("server", `Error in processing input: ${message.content}`)])
                })
        })

    });

    httpserver.listen(port, () => {
        console.log(`Listening on ${port}`);
    });


}



main().catch((err) =>{
    console.error(err)
})