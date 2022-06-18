import { evaluate } from '../src/evaluator'
import { Lexer } from '../src/lexer'
import { Parser } from '../src/parser'

describe('evaluate', () => {
  function evaluateInput(input: string) {
    const lexer = new Lexer(input)
    const tokens = lexer.tokenizeAll()

    const parser = new Parser(tokens)
    const ast = parser.parse()

    return evaluate(ast)
  }

  it('1 + 2', () => {
    const input = '1 + 2'
    const result = evaluateInput(input)
    expect(result).toEqual(3)
  })

  it('3/2', () => {
    const input = '3/2'
    const result = evaluateInput(input)
    expect(result).toEqual(1)
  })

  it('10 + 2 * 2', () => {
    const input = '10 + 2 * 2'
    const result = evaluateInput(input)
    expect(result).toEqual(14)
  })
})
