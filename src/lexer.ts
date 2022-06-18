export class Lexer {
  private currentIndex = -0

  constructor(private input: string) {}

  hasNextToken(): boolean {
    this.skipSpacesAndComments()
    return this.currentIndex < this.input.length
  }

  nextToken() {
    this.skipSpacesAndComments()

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

  private skipSpacesAndComments() {
    while (this.shouldSkip()) {
      switch (this.currentChar()) {
        case ' ':
          this.skipSpaces()
          break
        case '/':
          this.skipComment()
          break
      }
    }
  }

  shouldSkip() {
    const char = this.currentChar()
    const next = this.nextChar()
    return (
      char === ' ' ||
      (char === '/' && next === '/') ||
      (char === '/' && next === '*')
    )
  }

  private skipSpaces() {
    while (this.currentChar() === ' ') {
      this.currentIndex++
    }
  }

  private skipComment() {
    switch (this.nextChar()) {
      // skip one line comment
      case '/':
        this.currentIndex = this.input.length
        break
      // skip multiple line comment
      case '*':
        // /* の終了までスキップ
        this.currentIndex++
        // コメントの内部をスキップ
        while (!this.endOfMultipleLineComment()) {
          this.currentIndex++
        }
        // */ をスキップ
        this.currentIndex += 2
        break
    }
  }

  private endOfMultipleLineComment() {
    return this.currentChar() === '*' && this.nextChar() === '/'
  }
}

function isDigit(char: string): boolean {
  return '0' <= char && char <= '9'
}
