// ! npm run 3-4-2

export class BookingTrip {
  public execute(destination: string): string {
    try {
      const paymentResult = "💸  Paying trip to " + destination;
      console.log("ℹ️  transaction processed");
      const businessResult = "🚀 Booking trip " + paymentResult;
      console.log("ℹ️  action done");
      console.log("📧 Trip booked " + businessResult);
      console.log("ℹ️  notification sent");
      return businessResult;
    } catch (error) {
      console.log("ℹ️ 😵‍💫 error: " + error);
      return "";
    }
  }
}

export class CancelTrip {
  public execute(destination: string): string {
    try {
      const paymentResult = "🤑  Refunding trip to " + destination;
      console.log("ℹ️  transaction processed");
      const businessResult = "😭  Cancelling trip " + paymentResult;
      console.log("ℹ️  action done");
      console.log("✅ Done " + businessResult);
      console.log("ℹ️  notification sent");
      return businessResult;
    } catch (error) {
      console.log("ℹ️ 😵‍💫 error: " + error);
      return "";
    }
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
