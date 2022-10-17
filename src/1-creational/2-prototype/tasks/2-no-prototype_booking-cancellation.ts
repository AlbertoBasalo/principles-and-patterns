// ! npm run 1-2-2
import { BookingStatus } from "./booking-status.type";

class Booking {
  public readonly id: string = Date.now().toString();
  public readonly createdOn: Date | null = new Date();
  public updatedOn: Date | null = null;

  // eslint-disable-next-line max-params
  constructor(
    public destination: string,
    public departureDate: Date,
    public price: number,
    public status: BookingStatus = "Pending"
  ) {}
}

class App {
  public createBooking(): Booking {
    const booking = new Booking("🌖 The Moon", new Date(), 100);
    return booking;
  }

  public cancelBooking(booking: Booking): Booking {
    // ToDo: 🤢 mutable data, loose control and history
    booking.status = "Cancelled";
    booking.updatedOn = new Date();
    return booking;
  }
}

const app = new App();
const booking = app.createBooking();
console.log("🚀 Creating a Booking:", booking);
const cancelled = app.cancelBooking(booking);
console.log("🌍 Cancelling a booking:", cancelled);
console.log("🔥 Original Booking:", booking);
