import { Token } from './token'

export type AST = Expression

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
    private _expression: Expression | null
  ) {}

  get number() {
    return this._number
  }

  get expression() {
    return this._expression
  }

  toString(): string {
    if (this._number) {
      return this.number!.toString()
    } else {
      return this._expression!.toString()
    }
  }
}
