// ! npm run 3-4-3

export abstract class BusinessTemplate {
  public execute(payload: string): string {
    try {
      const paymentResult = this.processTransaction(payload);
      console.log("ℹ️  transaction processed");
      const businessResult = this.doBusinessAction(paymentResult);
      console.log("ℹ️  action done");
      this.sendNotification(businessResult);
      console.log("ℹ️  notification sent");
      return businessResult;
    } catch (error) {
      console.log("ℹ️ 😵‍💫 error: " + error);
      return "";
    }
  }
  //* mandatory steps
  protected abstract processTransaction(payload: string): string;
  protected abstract doBusinessAction(payload: string): string;
  // * default implementation if not overridden
  protected sendNotification(payload = ""): void {
    console.log("✅ Done " + payload);
  }
}

export class BookingTrip extends BusinessTemplate {
  protected processTransaction(destination: string): string {
    return "💸  Paying trip to " + destination;
  }
  protected doBusinessAction(payment: string): string {
    return "🚀 Booking trip " + payment;
  }
  protected override sendNotification(booking: string): void {
    console.log("📧 Trip booked " + booking);
  }
}

export class CancelTrip extends BusinessTemplate {
  protected processTransaction(destination: string): string {
    return "🤑  Refunding trip " + destination;
  }
  protected override doBusinessAction(refund: string): string {
    return "😭  Cancelling trip " + refund;
  }
}

export class Client {
  private booking = new BookingTrip();
  private cancel = new CancelTrip();
  public run(): void {
    this.booking.execute("The Moon");
    this.cancel.execute("The Moon");
  }
}

const client = new Client();
client.run();
