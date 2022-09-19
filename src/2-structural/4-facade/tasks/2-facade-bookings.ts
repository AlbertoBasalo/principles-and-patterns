export class Payments {
  public makePayment(issue: string, amount: number): string {
    return `${issue} ${amount} payed`;
  }
  public makeRefund(issue: string, amount: number): string {
    return `${issue} ${amount} refunded`;
  }
}

export class Bookings {
  public getPrice(trip: string): number {
    return 100;
  }
  public makeBooking(trip: string, payment: string): string {
    return `${trip} with ${payment} booked`;
  }
  public cancelBooking(trip: string, payment: string): string {
    return `${trip} with ${payment} canceled`;
  }
}

export class Notifier {
  public notify(trip: string, operation: string): string {
    return `${trip} ${operation} notified to passenger`;
  }
}

export class AgencyFacade {
  public createBooking(trip: string): string {
    const bookings = new Bookings();
    const tripPrice = bookings.getPrice(trip);
    const payments = new Payments();
    const paymentsResult = payments.makePayment(trip, tripPrice);
    const bookingsResult = bookings.makeBooking(trip, paymentsResult);
    const notifier = new Notifier();
    const notifierResult = notifier.notify(trip, "booked");
    return `💸 ${paymentsResult} +  📅 ${bookingsResult} + 📧 ${notifierResult}`;
  }
  public cancelBooking(trip: string): string {
    const bookings = new Bookings();
    const tripPrice = bookings.getPrice(trip);
    const payments = new Payments();
    const paymentsResult = payments.makeRefund(trip, tripPrice);
    const bookingsResult = bookings.cancelBooking(trip, paymentsResult);
    const notifier = new Notifier();
    const notifierResult = notifier.notify(trip, "canceled");
    return `💸 ${paymentsResult} +  📅 ${bookingsResult} + 📧 ${notifierResult}`;
  }
}

export class Client {
  private agency: AgencyFacade = new AgencyFacade();

  public createBooking(trip: string): string {
    return this.agency.createBooking(trip);
  }
  public cancelBooking(trip: string): string {
    return this.agency.cancelBooking(trip);
  }
}
const client = new Client();
console.log(client.createBooking("Paris"));
console.log(client.cancelBooking("Paris"));
