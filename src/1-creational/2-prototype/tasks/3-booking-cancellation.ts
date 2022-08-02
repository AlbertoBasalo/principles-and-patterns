export class Booking {
  public readonly id: string = "";
  public readonly destination: string = "";
  public readonly departureDate: Date = new Date();
  public readonly returnDate: Date = new Date();
  public readonly price: number = 0;
  public readonly currency: string = "";
  public readonly status: string = "";

  constructor(
    id: string,
    destination: string,
    departureDate: Date,
    returnDate: Date,
    price: number,
    currency: string,
    status: string
  ) {
    this.id = id;
    this.destination = destination;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
    this.price = price;
    this.currency = currency;
    this.status = status;
  }

  public cancel(): Booking {
    const cancelledBooking = new Booking(
      this.id,
      this.destination,
      this.departureDate,
      this.returnDate,
      this.price,
      this.currency,
      "cancelled"
    );
    return cancelledBooking;
  }
}

export class App {
  public getBooking(): Booking {
    const booking = new Booking(Math.random().toString(), "London", new Date(), new Date(), 100, "GBP", "Pending");
    console.log("Booking:", booking);
    return booking;
  }

  public cancelBooking(booking: Booking): void {
    const cancelled = booking.cancel();
    console.log("Cancelled booking:", cancelled);
  }
}

const app = new App();
const booking = app.getBooking();
app.cancelBooking(booking);
