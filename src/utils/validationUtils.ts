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
        if(isNaN(Number(number))) {
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
        if(!/[\(*\/+\-\%\^\)]/.test(symbol)) {
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