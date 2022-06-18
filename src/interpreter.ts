import readline from 'readline'
import { evaluate } from './evaluator'
import { Lexer } from './lexer'
import { Parser } from './parser'

function showPrompt() {
  process.stdout.write('> ')
}

function main() {
  const reader = readline.createInterface({
    input: process.stdin
  })

  showPrompt()
  reader.on('line', (line) => {
    const lexer = new Lexer(line)
    const tokens = lexer.tokenizeAll()

    const parser = new Parser(tokens)
    const ast = parser.parse()

    const result = evaluate(ast)
    console.log(result)

    showPrompt()
  })
}

main()
