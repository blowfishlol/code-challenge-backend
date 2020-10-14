import {MathNode, parse} from "mathjs";
import {isValidExpressionArray} from "./validationUtils";
import Message from "../models/Message";

export function validateAndCalculate(message: Message) {
  //format the expression to be seperated with space
  let expression : MathNode = parse(message.content);

  //split the numbers by parentheses and space to array
  let expressionCheck : string[] =  expression.toString().split(/[\s(\)]/).filter(t=>t!=="");


  if(!isValidExpressionArray(expressionCheck)) {
    throw Error("INVALID_CHARACTER");
  }

  let result = expression.evaluate();

  if(result instanceof Object) {
    throw Error("NO_VARIABLE_ALLOWED");
  }

  return result
}