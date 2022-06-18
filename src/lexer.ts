export class Lexer {
  private currentIndex = -0

  constructor(private input: string) {}

  hasNextToken(): boolean {
    this.skipSpaces()
    return this.currentIndex < this.input.length
  }

  nextToken() {
    this.skipSpaces()

    let token
    if (isDigit(this.currentChar())) {
      const startIndex = this.currentIndex
      let endIndex = this.currentIndex

      while (isDigit(this.nextChar())) {
        endIndex = this.currentIndex + 1
        this.currentIndex++
      }
      token = this.input.slice(startIndex, endIndex + 1)
    } else {
      token = this.currentChar()
    }

    this.currentIndex++
    return token
  }

  tokenizeAll(): string[] {
    const tokens = []
    while (this.hasNextToken()) {
      tokens.push(this.nextToken())
    }
    return tokens
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
