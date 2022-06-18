export class Lexer {
  private currentIndex = -1

  constructor(private input: string) {}

  hasNextToken(): boolean {
    return this.currentIndex < this.input.length - 1
  }

  nextToken() {
    this.currentIndex++

    let currentChar = this.input[this.currentIndex]

    // Skip spaces
    while (currentChar === ' ') {
      this.currentIndex++
      currentChar = this.input[this.currentIndex]
    }

    return currentChar
  }
}
