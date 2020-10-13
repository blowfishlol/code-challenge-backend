import historyDAO from "./daos/historyDAO";
import mongo from "./services/mongo"
import express, {Express} from "express"

import socketio, {Socket} from "socket.io"

const port = process.env.PORT || 5000

async function main() {
    await mongo.init()
    //let result = await historyDAO.getAllHistory()
    //console.log(result)

    const app : Express = express()
    let httpserver = require("http").Server(app)
    let io = socketio(httpserver)

    io.on("connection", (socket: Socket) => {
        console.log("a user connected");

        socket.on("message", (message : any) =>{
            socket.emit("response", `WOW! ${message}`)
        })

    });

    const server = httpserver.listen(port, function() {
        console.log(`Listening on ${port}`);
    });


}



main().catch((err) =>{
    console.error(err)
})