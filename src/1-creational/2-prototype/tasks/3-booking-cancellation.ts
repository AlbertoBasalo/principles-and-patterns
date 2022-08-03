type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";

export class Booking {
  public readonly id: string = "";
  public readonly destination: string = "";
  public readonly departureDate: Date = new Date();
  public readonly returnDate: Date = new Date();
  public readonly price: number = 0;
  public readonly currency: string = "";
  public readonly status: BookingStatus = "";
  public readonly createdOn: Date | null;
  public readonly updatedOn: Date | null;

  // eslint-disable-next-line max-lines-per-function, max-params
  constructor(
    id: string,
    destination: string,
    departureDate: Date,
    returnDate: Date,
    price: number,
    currency: string,
    status: BookingStatus,
    createdOn: Date | null = new Date(),
    updatedOn: Date | null = null
  ) {
    this.id = id;
    this.destination = destination;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
    this.price = price;
    this.currency = currency;
    this.status = status;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }

  public cancel(): Booking {
    const cancelledBooking = new Booking(
      this.id,
      this.destination,
      this.departureDate,
      this.returnDate,
      this.price,
      this.currency,
      "Cancelled",
      this.createdOn,
      new Date()
    );
    return cancelledBooking;
  }
}

export class App {
  public getBooking(): Booking {
    const bookingId = Math.random().toString();
    const booking = new Booking(bookingId, "London", new Date(), new Date(), 100, "GBP", "Pending");
    return booking;
  }

  public cancelBooking(booking: Booking): Booking {
    const cancelled = booking.cancel();
    return cancelled;
  }
}

const app = new App();
const booking = app.getBooking();
console.log("💚 Booking:", booking);
const cancelled = app.cancelBooking(booking);
console.log("🚫 Cancelled booking:", cancelled);
