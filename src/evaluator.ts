export function evaluate(tokens: string[]): any {
  let result = parseInt(tokens[0])

  for (let i = 1; i < tokens.length; i = i + 2) {
    const operator = tokens[i]
    const rightValue = parseInt(tokens[i + 1])

    switch (operator) {
      case '+':
        result += rightValue
        break
      case '-':
        result -= rightValue
        break
      case '*':
        result *= rightValue
        break
      case '/':
        result /= rightValue
        result = Math.floor(result)
        break
      default:
        throw new Error(`Unsupported operator '${operator}'.`)
    }
  }

  return result
}
