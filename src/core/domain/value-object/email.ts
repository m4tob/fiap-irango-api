export default class Email {
  constructor (private value: string) {
    if (!value || !this.validate()) {
      throw new Error('Invalid Email')
    }
  }

  /**
   * toStrings
   */
  public toString (): string {
    return this.value
  }

  private validate (): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regexEmail.test(this.value)
  }
}
