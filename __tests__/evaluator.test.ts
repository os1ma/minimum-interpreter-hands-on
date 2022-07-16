import { Environment, evaluate } from '../src/evaluator'
import { Lexer } from '../src/lexer'
import { Parser } from '../src/parser'

describe('evaluate', () => {
  function evaluateInput(input: string, env: Environment = {}) {
    const lexer = new Lexer(input)
    const tokens = lexer.tokenizeAll()

    const parser = new Parser(tokens)
    const ast = parser.parse()

    return evaluate(ast, env)
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

  it('support variable', () => {
    const env = {}
    const input1 = 'let a = 3'
    const resutl1 = evaluateInput(input1, env)
    expect(resutl1).toEqual(null)

    const input2 = 'a'
    const result2 = evaluateInput(input2, env)
    expect(result2).toEqual(3)

    const input3 = 'let hoge = (a + 2) * 2'
    const result3 = evaluateInput(input3, env)
    expect(result3).toEqual(null)

    const input4 = 'hoge'
    const result4 = evaluateInput(input4, env)
    expect(result4).toEqual(10)
  })
})
