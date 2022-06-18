import { Token } from './token'

export function evaluate(tokens: Token[]): any {
  let result = parseInt(tokens[0].value)

  for (let i = 1; i < tokens.length; i = i + 2) {
    const operator = tokens[i].value
    const rightValue = parseInt(tokens[i + 1].value)

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
