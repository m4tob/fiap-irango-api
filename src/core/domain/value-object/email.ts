export default class Email {
  // TODO: criar regras do value Object
  constructor (private value: string) {}

  /**
   * toString
   */
  public toString (): string {
    return this.value
  }
}
