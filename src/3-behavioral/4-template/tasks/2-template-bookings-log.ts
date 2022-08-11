export abstract class BusinessTemplate {
  public abstract doPaymentTransaction(payload: string): string;
  public abstract performBusinessAction(payload: string): string;
  public sendNotification(payload = ""): void {
    console.log("✅ Done " + payload);
  }
  public execute(payload: string): string {
    console.log("ℹ️  starting business action");
    let businessResult = "";
    try {
      businessResult = this.doMainLogic(payload);
    } catch (error) {
      console.log("ℹ️ 😵‍💫 error: " + error);
    }
    return businessResult;
  }

  private doMainLogic(payload: string): string {
    const paymentResult = this.doPaymentTransaction(payload);
    console.log("ℹ️  payment done");
    const businessResult = this.performBusinessAction(paymentResult);
    console.log("ℹ️  action done");
    this.sendNotification(businessResult);
    console.log("ℹ️  notification done");
    return businessResult;
  }
}

export class BookingTrip extends BusinessTemplate {
  public doPaymentTransaction(payload: string): string {
    return "💸  Paying trip";
  }
  public performBusinessAction(): string {
    return "🚀 Booking trip";
  }
  public override sendNotification(payload: string): void {
    console.log("📧 Trip booked");
  }
}

export class CancelTrip extends BusinessTemplate {
  public doPaymentTransaction(payload: string): string {
    return "🤑  Refunding trip";
  }
  public override performBusinessAction(): string {
    return "😭  Cancelling trip";
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
