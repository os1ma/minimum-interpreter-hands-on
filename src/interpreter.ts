import readline from 'readline'

function showPrompt() {
  process.stdout.write('> ')
}

function main() {
  const reader = readline.createInterface({
    input: process.stdin
  })

  showPrompt()
  reader.on('line', (line) => {
    console.log(line)
    showPrompt()
  })
}

main()
