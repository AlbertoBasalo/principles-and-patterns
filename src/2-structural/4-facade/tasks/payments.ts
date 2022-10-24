export class Payments {
  public makePayment(issue: string, amount: number): string {
    return `${issue} ${amount} payed`;
  }
  public makeRefund(issue: string, amount: number): string {
    return `${issue} ${amount} refunded`;
  }
}
