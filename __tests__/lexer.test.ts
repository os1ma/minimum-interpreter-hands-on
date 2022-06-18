import { Lexer } from '../src/lexer'

describe('Lexer', () => {
  it('tokenize 1 +  2 ', () => {
    const input = '1 +  2 '
    const lexer = new Lexer(input)

    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('1')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('+')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('2')
    expect(lexer.hasNextToken()).toEqual(false)
  })

  it('tokenize 3/2', () => {
    const input = '3/2'
    const lexer = new Lexer(input)

    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('3')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('/')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('2')
    expect(lexer.hasNextToken()).toEqual(false)
  })

  it('tokenize 10 + 2 * 2', () => {
    const input = '10 + 2 * 2'
    const lexer = new Lexer(input)

    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('10')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('+')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('2')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('*')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual('2')
    expect(lexer.hasNextToken()).toEqual(false)
  })
})
