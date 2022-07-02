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

const tokenTypes = ['INTEGER', 'SYMBOL', 'KEYWORD', 'IDENTIFIER'] as const

type TokenType = typeof tokenTypes[number]

export const symbols = ['+', '-', '*', '/', '(', ')', '='] as const

export const keywords = ['let'] as const
