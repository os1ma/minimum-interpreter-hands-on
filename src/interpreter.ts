import readline from 'readline'
import { evaluate } from './evaluator'
import { Lexer } from './lexer'

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
    const result = evaluate(tokens)
    console.log(result)

    showPrompt()
  })
}

main()
