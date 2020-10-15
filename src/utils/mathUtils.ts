import {MathNode, parse, compile} from "mathjs";
import {isValidExpressionArray, isValidNumbers, isValidSymbols} from "./validationUtils";
import Message from "../models/Message";

export function calculateFromMessage(message: Message) {
    //format the expression to be seperated with space
    if(message.content.toLowerCase().includes("exponent")) {
        throw Error(`Invalid input 'exponent'`)
    }
    let replacedExponent = message.content.replace(/e\+/g, "exponent").replace(/\s/g, "")
    let numberList = replacedExponent.replace(/[\(\+\-\*\/\^\%\)]/g, "#").replace(/exponent/g, "e+").split("#").filter(t=>t!=="")
    let symbolList = replacedExponent.replace(/[^\(\+\-\*\/\^\%\)]/g, "%").split("%").filter(t=>t!=="")
   
    let numberValidReport = isValidNumbers(numberList)
    if(!numberValidReport.success) {
        throw Error(`Invalid input '${numberValidReport.problem}'`)
    }

    let validSymbolReport = isValidSymbols(symbolList)
    if(!validSymbolReport.success) {
        throw Error(`Invalid symbol '${validSymbolReport.problem}'`)
    }

    let expression : MathNode = parse(message.content);
    let result = expression.evaluate();

    if(result instanceof Object) {
        throw Error("No variable allowed");
    }

    return result
}