import historyDAO from "../daos/historyDAO";
import History from "../models/History";
import Message from "../models/Message";

export async function generateResponse(message: Message) : Promise<Message[]>{

    if(message.content.toLowerCase() === "history") {
        let rows = await historyDAO.getLast10()
        return rows.map(r=> {
            return new Message("server", `Command@${r.timestamp.toString()} : ${r.command} = ${r.result}`, new Date())
        })
    } else {
        let result = eval(message.content)
        let history = new History(message.content, result)
        await historyDAO.insert(history)
        return [new Message("server", `Result: ${result}`)]
    }

}