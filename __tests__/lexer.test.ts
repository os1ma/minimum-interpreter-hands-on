import { Lexer } from '../src/lexer'
import { Token } from '../src/token'

describe('Lexer', () => {
  it('tokenize 1 +  2 ', () => {
    const input = '1 +  2 // + 3'
    const lexer = new Lexer(input)

    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('1', 'INTEGER'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('+', 'SYMBOL'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('2', 'INTEGER'))
    expect(lexer.hasNextToken()).toEqual(false)
  })

  it('tokenize 3/2', () => {
    const input = '3/2/*+5*/'
    const lexer = new Lexer(input)

    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('3', 'INTEGER'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('/', 'SYMBOL'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('2', 'INTEGER'))
    expect(lexer.hasNextToken()).toEqual(false)
  })

  it('tokenize 10 + 2 * 3', () => {
    const input = '10 + 2*/* hogehoge */3/*/+2*/'
    const lexer = new Lexer(input)

    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('10', 'INTEGER'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('+', 'SYMBOL'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('2', 'INTEGER'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('*', 'SYMBOL'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('3', 'INTEGER'))
    expect(lexer.hasNextToken()).toEqual(false)
  })

  it('tokenize let a = 123', () => {
    const input = 'let a = 123'
    const lexer = new Lexer(input)

    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('let', 'KEYWORD'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('a', 'IDENTIFIER'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('=', 'SYMBOL'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('123', 'INTEGER'))
    expect(lexer.hasNextToken()).toEqual(false)
  })
})
