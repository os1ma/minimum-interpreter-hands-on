import { Token } from './token'

export type AST = Statement

export type Statement = Expression | LetStatement

type OperatorTermPair = {
  operator: Token
  term: Term
}

export class Expression {
  constructor(private _left: Term, private _operations: OperatorTermPair[]) {}

  get left() {
    return this._left
  }

  get operations() {
    return this._operations
  }

  toString(): string {
    if (this.operations.length === 0) {
      return this.left.toString()
    } else {
      const ops = this.operations
        .map((op) => ` ${op.operator} ${op.term}`)
        .reduce((l, r) => `${l}${r}`)
      return `(${this.left}${ops})`
    }
  }
}

type OperatorFactorPair = {
  operator: Token
  factor: Factor
}

export class Term {
  constructor(
    private _left: Factor,
    private _operations: OperatorFactorPair[]
  ) {}

  get left() {
    return this._left
  }

  get operations() {
    return this._operations
  }

  toString(): string {
    if (this.operations.length === 0) {
      return this.left.toString()
    } else {
      const ops = this.operations
        .map((op) => ` ${op.operator} ${op.factor}`)
        .reduce((l, r) => `${l}${r}`)
      return `(${this.left}${ops})`
    }
  }
}

export class Factor {
  constructor(
    private _number: Token | null,
    private _varName: Token | null,
    private _expression: Expression | null
  ) {}

  isNumber() {
    return this._number !== null
  }

  get number() {
    return this._number
  }

  get varName() {
    return this._varName
  }

  get expression() {
    return this._expression
  }

  toString(): string {
    if (this._number) {
      return this.number!.toString()
    } else if (this._varName) {
      return this.varName!.toString()
    } else {
      return this._expression!.toString()
    }
  }
}

export class LetStatement {
  constructor(private _varName: Token, private _expression: Expression) {}

  get varName() {
    return this._varName
  }

  get expression() {
    return this._expression
  }

  toString(): string {
    return `let ${this.varName} = ${this.expression}`
  }
}
