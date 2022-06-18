import { AST, Expression, Factor, Term } from './ast'
import { Token } from './token'

export class Parser {
  private currentIndex = 0

  constructor(private tokens: Token[]) {}

  parse(): AST {
    return this.parseExpression()
  }

  parseExpression(): Expression {
    const left = this.parseTerm()

    const operations = []
    let current = this.currentToken()
    while (current && (current.value === '+' || current.value === '-')) {
      this.currentIndex++

      const operation = {
        operator: current,
        term: this.parseTerm()
      }
      operations.push(operation)

      current = this.currentToken()
    }

    return new Expression(left, operations)
  }

  parseTerm(): Term {
    const left = this.parseFactor()

    const operations = []
    let current = this.currentToken()
    while (current && (current.value === '*' || current.value === '/')) {
      this.currentIndex++

      const operation = {
        operator: current,
        factor: this.parseFactor()
      }
      operations.push(operation)

      current = this.currentToken()
    }

    return new Term(left, operations)
  }

  parseFactor(): Factor {
    const current = this.currentToken()

    if (current.type === 'INTEGER') {
      this.currentIndex++
      return new Factor(current, null)
    } else if (current.value === '(') {
      this.currentIndex++
      const expression = this.parseExpression()

      if (this.currentToken().value !== ')') {
        throw new Error(`Expected token is ')' but got ${this.currentToken()}.`)
      }
      this.currentIndex++
      return new Factor(null, expression)
    } else {
      throw new Error(`Invalid token '${current}'.`)
    }
  }

  private currentToken(): Token {
    return this.tokens[this.currentIndex]
  }
}
