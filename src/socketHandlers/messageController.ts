import historyDAO from "../daos/historyDAO";
import History from "../models/History";
import Message from "../models/Message";
import {evaluate} from "mathjs"

export async function generateResponse(message: Message) : Promise<Message[]>{

    if(message.content.toLowerCase() === "history") {
        let rows = await historyDAO.getLast10()
        return rows.map(r=> {
            let dateString = `${r.timestamp.toLocaleDateString("en-US")} ${r.timestamp.getHours()}:${r.timestamp.getMinutes()}`
            return new Message("server", `Command@${dateString} : ${r.command} = ${r.result}`, new Date())
        })
    } else {
        let result = evaluate(message.content)
        console.log(result)
        let history = new History(message.content, result)
        await historyDAO.insert(history)
        return [new Message("server", `Result: ${result}`)]
    }

}