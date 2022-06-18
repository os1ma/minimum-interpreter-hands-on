import { AST } from '../src/ast'
import { Lexer } from '../src/lexer'
import { Parser } from '../src/parser'

describe('Parser', () => {
  function parseInput(input: string): AST {
    const lexer = new Lexer(input)
    const tokens = lexer.tokenizeAll()
    const parser = new Parser(tokens)
    return parser.parse()
  }

  it('parse 5 + 2 * 5', () => {
    const input = '5 + 2 * 5'
    const expected = '(5 + (2 * 5))'
    const ast = parseInput(input)
    expect(ast.toString()).toEqual(expected)
  })

  it('parse 10 / 3 * 3', () => {
    const input = '10 / 3 * 3'
    const expected = '(10 / 3 * 3)'
    const ast = parseInput(input)
    expect(ast.toString()).toEqual(expected)
  })
})
