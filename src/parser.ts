import { AST, Expression, Factor, LetStatement, Term } from './ast'
import { Token } from './token'

export class Parser {
  private currentIndex = 0

  constructor(private tokens: Token[]) {}

  parse(): AST {
    const current = this.currentToken()

    if (current.type === 'KEYWORD' && current.value === 'let') {
      return this.parseLetStatement()
    } else {
      return this.parseExpression()
    }
  }

  private parseExpression(): Expression {
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

  private parseTerm(): Term {
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

  private parseFactor(): Factor {
    const current = this.currentToken()

    if (current.type === 'INTEGER') {
      this.currentIndex++
      return new Factor(current, null, null)
    } else if (current.type === 'IDENTIFIER') {
      this.currentIndex++
      return new Factor(null, current, null)
    } else if (current.value === '(') {
      this.currentIndex++
      const expression = this.parseExpression()

      if (this.currentToken().value !== ')') {
        throw new Error(`Expected token is ')' but got ${this.currentToken()}.`)
      }
      this.currentIndex++
      return new Factor(null, null, expression)
    } else {
      throw new Error(`Invalid token '${current}'.`)
    }
  }

  private parseLetStatement(): LetStatement {
    const letToken = this.currentToken()
    if (letToken.type !== 'KEYWORD' || letToken.value !== 'let') {
      throw new Error(`'let' expected but got '${letToken}'`)
    }
    this.currentIndex++

    const varName = this.currentToken()
    this.currentIndex++

    const equals = this.currentToken()
    if (equals.type !== 'SYMBOL' || equals.value !== '=') {
      throw new Error(`'=' expected but got ${equals}`)
    }
    this.currentIndex++

    const expression = this.parseExpression()

    return new LetStatement(varName, expression)
  }

  private currentToken(): Token {
    return this.tokens[this.currentIndex]
  }
}
