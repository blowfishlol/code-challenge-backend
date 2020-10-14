import historyDAO from "../daos/historyDAO";
import History from "../models/History";
import Message from "../models/Message";
import {MathNode, parse} from "mathjs";
import {isValidExpressionArray} from "../utils/validationUtils";

export async function generateResponse(message: Message) : Promise<Message[]>{

    if(message.content.toLowerCase() === "history") {
        let rows = await historyDAO.getLast10();
        return rows.map(r=> {
            let dateString = `${r.timestamp.toLocaleDateString("en-US")} ${r.timestamp.getHours()}:${r.timestamp.getMinutes()}`;
            return new Message("server", `Command@${dateString} : ${r.command} = ${r.result}`, new Date())
        })
    } else {

        let expression : MathNode = parse(message.content);
        let expressionCheck : string[] =  expression.toString().split(/[\s(\)]/).filter(t=>t!=="");
        if(!isValidExpressionArray(expressionCheck)) {
            throw Error("INVALID_CHARACTER");
        }

        let result = expression.evaluate();

        if(result instanceof Object) {
            throw Error("NO_VARIABLE_ALLOWED");
        }

        console.log("Evaluate Result", typeof result, result);
        let history = new History(message.content, result);
        await historyDAO.insert(history);
        return [new Message("server", `Result: ${result}`)];
    }

}