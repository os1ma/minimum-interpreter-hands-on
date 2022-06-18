export class Token {
  constructor(private _value: string, private _type: TokenType) {}

  get value() {
    return this._value
  }

  get type() {
    return this._type
  }

  toString() {
    return this._value
  }
}

const tokenTypes = ['INTEGER', 'OPERATOR'] as const

type TokenType = typeof tokenTypes[number]
