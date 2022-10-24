// ! npm run 2-4-2
import { Bookings } from "./bookings";
import { Notifier } from "./notifier";
import { Payments } from "./payments";

export class Client {
  // ToDo: 🤢 depends on three classes...
  private bookings: Bookings = new Bookings();
  private payments: Payments = new Payments();
  private notifier: Notifier = new Notifier();

  // ToDo: 🤢 too much internal know how (inappropriate intimacy)
  public createBooking(trip: string): string {
    const tripPrice = this.bookings.getPrice(trip);
    const paymentsResult = this.payments.makePayment(trip, tripPrice);
    const bookingsResult = this.bookings.makeBooking(trip, paymentsResult);
    const notifierResult = this.notifier.notify(trip, "booked");
    return `💸 ${paymentsResult} +  📅 ${bookingsResult} + 📧 ${notifierResult}`;
  }
  public cancelBooking(trip: string): string {
    const tripPrice = this.bookings.getPrice(trip);
    const paymentsResult = this.payments.makeRefund(trip, tripPrice);
    const bookingsResult = this.bookings.cancelBooking(trip, paymentsResult);
    const notifierResult = this.notifier.notify(trip, "canceled");
    return `💸 ${paymentsResult} +  📅 ${bookingsResult} + 📧 ${notifierResult}`;
  }
}

const client = new Client();
console.log(client.createBooking("Paris"));
console.log(client.cancelBooking("Paris"));
