import { evaluate } from '../src/evaluator'
import { Lexer } from '../src/lexer'

describe('evaluate', () => {
  function evaluateInput(input: string) {
    const lexer = new Lexer(input)
    const tokens = lexer.tokenizeAll()
    return evaluate(tokens)
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
    expect(result).toEqual(24)
  })
})
