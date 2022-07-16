import { AST, Expression, Factor, LetStatement, Term } from './ast'

export type Environment = { [key: string]: number }

export function evaluate(ast: AST, env: Environment): any {
  if (ast instanceof Expression) {
    return evaluateExpression(ast, env)
  } else if (ast instanceof LetStatement) {
    return evaluateLetStatement(ast, env)
  } else {
    throw new Error('Not implemented')
  }
}

function evaluateExpression(expression: Expression, env: Environment): number {
  let result = evaluateTerm(expression.left, env)

  expression.operations.forEach((op) => {
    const value = evaluateTerm(op.term, env)
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

function evaluateTerm(term: Term, env: Environment): number {
  let result = evaluateFactor(term.left, env)

  term.operations.forEach((op) => {
    const value = evaluateFactor(op.factor, env)
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

function evaluateFactor(factor: Factor, env: Environment): number {
  if (factor.isNumber()) {
    return parseInt(factor.number!.value)
  } else if (factor.isVarName()) {
    return env[factor.varName!.value]
  } else {
    return evaluateExpression(factor.expression!, env)
  }
}

function evaluateLetStatement(
  letStatement: LetStatement,
  env: Environment
): null {
  const varName = letStatement.varName
  const expression = letStatement.expression

  env[varName.value] = evaluateExpression(expression, env)

  return null
}
