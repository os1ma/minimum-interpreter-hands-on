import { evaluate } from '../src/evaluator'

describe('evaluate', () => {
  it('1 + 2', () => {
    const tokens = ['1', '+', '2']
    const result = evaluate(tokens)
    expect(result).toEqual(3)
  })

  it('3/2', () => {
    const tokens = ['3', '/', '2']
    const result = evaluate(tokens)
    expect(result).toEqual(1)
  })

  it('10 + 2 * 2', () => {
    const tokens = ['10', '+', '2', '*', '2']
    const result = evaluate(tokens)
    expect(result).toEqual(24)
  })
})
