export class Lexer {
  private currentIndex = -1

  constructor(private input: string) {}

  hasNextToken(): boolean {
    return this.currentIndex < this.input.length - 1
  }

  nextToken() {
    this.currentIndex++

    this.skipSpaces()

    const currentChar = this.input[this.currentIndex]

    if (isDigit(currentChar)) {
      const startIndex = this.currentIndex
      let endIndex = this.currentIndex

      let nextChar = this.input[this.currentIndex + 1]
      while (isDigit(nextChar)) {
        endIndex = this.currentIndex + 1
        this.currentIndex++
        nextChar = this.input[this.currentIndex + 1]
      }
      return this.input.slice(startIndex, endIndex + 1)
    } else {
      return currentChar
    }
  }

  private skipSpaces() {
    let currentChar = this.input[this.currentIndex]
    while (currentChar === ' ') {
      this.currentIndex++
      currentChar = this.input[this.currentIndex]
    }
  }
}

function isDigit(char: string): boolean {
  return '0' <= char && char <= '9'
}
