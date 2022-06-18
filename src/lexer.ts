export class Lexer {
  private currentIndex = -1

  constructor(private input: string) {}

  hasNextToken(): boolean {
    this.skipSpaces()
    return this.currentIndex < this.input.length - 1
  }

  nextToken() {
    this.currentIndex++

    this.skipSpaces()

    if (isDigit(this.currentChar())) {
      const startIndex = this.currentIndex
      let endIndex = this.currentIndex

      while (isDigit(this.nextChar())) {
        endIndex = this.currentIndex + 1
        this.currentIndex++
      }
      return this.input.slice(startIndex, endIndex + 1)
    } else {
      return this.currentChar()
    }
  }

  private currentChar() {
    return this.input[this.currentIndex]
  }

  private nextChar() {
    return this.input[this.currentIndex + 1]
  }

  private skipSpaces() {
    while (this.currentChar() === ' ') {
      this.currentIndex++
    }
  }
}

function isDigit(char: string): boolean {
  return '0' <= char && char <= '9'
}
