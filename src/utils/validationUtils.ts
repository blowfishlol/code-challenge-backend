
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