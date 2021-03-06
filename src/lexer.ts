import { keywords, symbols, Token } from './token'

export class Lexer {
  private currentIndex = -0

  constructor(private input: string) {}

  hasNextToken(): boolean {
    this.skipSpacesAndComments()
    return this.currentIndex < this.input.length
  }

  nextToken(): Token {
    this.skipSpacesAndComments()

    if (isDigit(this.currentChar())) {
      const startIndex = this.currentIndex
      let endIndex = this.currentIndex

      while (isDigit(this.nextChar())) {
        endIndex = this.currentIndex + 1
        this.currentIndex++
      }
      const tokenValue = this.input.slice(startIndex, endIndex + 1)
      this.currentIndex++
      return new Token(tokenValue, 'INTEGER')
    } else if (isSymbol(this.currentChar())) {
      const tokenValue = this.currentChar()
      this.currentIndex++
      return new Token(tokenValue, 'SYMBOL')
    } else if (isAlphabet(this.currentChar())) {
      const startIndex = this.currentIndex
      let endIndex = this.currentIndex

      while (isAlphabet(this.nextChar())) {
        endIndex = this.currentIndex + 1
        this.currentIndex++
      }
      const tokenValue = this.input.slice(startIndex, endIndex + 1)
      this.currentIndex++

      const tokeyType = isKeyword(tokenValue) ? 'KEYWORD' : 'IDENTIFIER'
      return new Token(tokenValue, tokeyType)
    } else {
      throw new Error('Unsupported token.')
    }
  }

  tokenizeAll(): Token[] {
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
        // /* ???????????????????????????
        this.currentIndex += 2
        // ????????????????????????????????????
        while (!this.endOfMultipleLineComment()) {
          this.currentIndex++
        }
        // */ ???????????????
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

function isSymbol(char: string): boolean {
  return symbols.some((s) => s === char)
}

function isAlphabet(char: string): boolean {
  return ('a' <= char && char <= 'z') || ('A' <= char && char <= 'Z')
}

function isKeyword(str: string): boolean {
  return keywords.some((k) => k === str)
}
