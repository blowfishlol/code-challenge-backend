interface Report {
    success: boolean,
    problem?: string
}

export function isValidExpressionArray(inputs: string[]) {
    for(let symbol of inputs) {
        if(isNaN(Number(symbol))) {
            if(!/[*\/+\-\%\^]/.test(symbol)) {
                //console.log("Problematic", symbol)
                return false
            }
        }
    }
    return true
}

export function isValidNumbers(inputs: string[]) : Report{
    for(let number of inputs) {
        if(!isNumber(number)) {
            return {
                success: false,
                problem: number
            }
        }
    }
    return {
        success: true
    }
}

export function isValidSymbols(inputs: string[]) : Report {
    for(let symbol of inputs) {
        if(!isSymbol(symbol)) {
            return {
                success: false,
                problem: symbol
            }
        }
    }
    return {
        success: true
    }
}

export function isSymbol(input: string) : boolean {
    return /[\(*\/+\-\%\^\)]/.test(input)
}

export function isOperator(input: string) : boolean {
    return /[*\/+\-\^]/.test(input)
}

export function isNumber(input: string) : boolean {
    return input.length > 0 && !isNaN(Number(input))
}