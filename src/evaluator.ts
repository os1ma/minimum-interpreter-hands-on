import { AST, Expression, Factor, Term } from './ast'

export function evaluate(ast: AST): any {
  if (ast instanceof Expression) {
    return evaluateExpression(ast)
  } else {
    throw new Error('Not implemented')
  }
}

function evaluateExpression(expression: Expression): number {
  let result = evaluateTerm(expression.left)

  expression.operations.forEach((op) => {
    const value = evaluateTerm(op.term)
    switch (op.operator.value) {
      case '+':
        result += value
        break
      case '-':
        result += value
        break
      default:
        throw new Error(`Invalid operation '${op.operator.value}'.`)
    }
  })

  return result
}

function evaluateTerm(term: Term): number {
  let result = evaluateFactor(term.left)

  term.operations.forEach((op) => {
    const value = evaluateFactor(op.factor)
    switch (op.operator.value) {
      case '*':
        result *= value
        break
      case '/':
        result = Math.floor(result / value)
        break
      default:
        throw new Error(`Invalid operation '${op.operator.value}'.`)
    }
  })

  return result
}

function evaluateFactor(factor: Factor): number {
  if (factor.isNumber()) {
    return parseInt(factor.number!.value)
  } else {
    return evaluateExpression(factor.expression!)
  }
}
