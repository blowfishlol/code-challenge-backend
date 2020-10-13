import historyDAO from "./daos/historyDAO";
import mongo from "./services/mongo"
import express, {Express} from "express"

import socketio, {Socket} from "socket.io"

async function main() {
    await mongo.init()
    //let result = await historyDAO.getAllHistory()
    //console.log(result)

    const app : Express = express()
    app.set("port", 5000)
    let httpserver = require("http").Server(app)
    let io = socketio(httpserver)

    io.on("connection", (socket: Socket) => {
        console.log("a user connected");

        socket.on("message", (message : any) =>{
            socket.emit("response", `WOW! ${message}`)
        })

    });

    const server = httpserver.listen(3000, function() {
        console.log("listening on *:3000");
    });


}



main().catch((err) =>{
    console.error(err)
})