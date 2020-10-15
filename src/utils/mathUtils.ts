import {MathNode, parse} from "mathjs";
import {isNumber, isOperator, isSymbol} from "./validationUtils";
import Message from "../models/Message";

export function calculateFromMessage(message: Message) {

    let inputTokens = tokenizeInput(message.content);
    let joined = inputTokens.join("");
    //console.log(inputTokens, joined)

    let expression : MathNode = parse(joined);
    let result = expression.evaluate();

    if(result instanceof Object) {
        throw Error("No variable allowed");
    }

    return result
}


function tokenizeInput(input: string) : string[] {

    let tokens : string[] = [];
    let currentNumber : string = "";

    //replace double whitespace with single space
    let content = input.trim().replace(/\s\s+/g, " ")

    for(let i = 0 ; i < content.length ; i ++) {
        let curr = content.charAt(i);

        if(isNumber(curr) || curr === ".") { //Check if number
            currentNumber += curr
        } else if (currentNumber.length>0 && curr === "e") { //Check if exponent notation
            let next = content.charAt(i+1);
            if(isNumber(next)) {
                currentNumber += curr+next;
                i++ //consume the number also
            }else if(next === "+") {
                let afterPlus = content.charAt(i+2);
                if(afterPlus && isNumber(afterPlus)) {
                    currentNumber += curr+next+afterPlus;
                    i+=2 //consume the number also
                } else {
                    throw Error("Missing exponent value after " + next)
                }
            }else {
                throw Error("Missing exponent value after " + curr)
            }
        } else if(isSymbol(curr)) { //Check if a symbol
            if(currentNumber.length > 0) {
                if(isNumber(currentNumber)) {
                    tokens.push(currentNumber);
                    currentNumber = ""
                } else {
                    throw Error("Unexpected Number " + currentNumber)
                }

            }
            tokens.push(curr)
        } else if(curr === " ") {
            let next = content.charAt(i+1);
            let prev = content.charAt(i-1)
            if(isNumber(prev) && isNumber(next)) {
                throw Error("Unexpected Whitespace")
            }
        } else {
            throw Error("Unexpected Character " + curr)
        }
    }
    if(currentNumber.length > 0) {
        tokens.push(currentNumber)
    }
    return tokens
}