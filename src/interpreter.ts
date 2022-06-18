import readline from 'readline'
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
    console.log(lexer)
    showPrompt()
  })
}

main()
