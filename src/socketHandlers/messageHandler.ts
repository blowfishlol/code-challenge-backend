import historyDAO from "../daos/historyDAO";
import History from "../models/History";
import Message from "../models/Message";
import {calculateFromMessage} from "../utils/mathUtils";
import {Socket} from "socket.io";

async function generateResponse(message: Message) : Promise<Message[]>{

    if(message.content.toLowerCase() === "history") {
        let rows = await historyDAO.getLast10();
        return rows.map(r=> {
            let dateString = `${r.timestamp.toLocaleDateString("en-US")} ${r.timestamp.getHours()}:${r.timestamp.getMinutes()}`;
            return new Message("server", `Command@${dateString} : ${r.command} = ${r.result}`, new Date())
        })
    } else {
        let result = calculateFromMessage(message);
        let history = new History(message.content, result);
        await historyDAO.insert(history);
        return [new Message("server", `Result: ${result}`)];
    }

}

export function handleMessageEvent(socket : Socket,message : Message){
    generateResponse(message)
        .then(messages=>{
            socket.emit("response", messages)
        })
        .catch(err=>{
            socket.emit("response", [new Message("server", `Error in processing input. ${err.message}`)])
        })
}