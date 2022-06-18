import { Lexer } from '../src/lexer'

describe('Lexer', () => {
  it('tokenize', () => {
    const input = '1 + 2'
    const lexer = new Lexer(input)

    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('1')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('+')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('2')
    expect(lexer.hasNextToken()).toEqual(false)
  })
})
