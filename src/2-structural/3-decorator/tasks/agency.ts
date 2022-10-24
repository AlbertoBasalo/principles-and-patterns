import { Booking } from "./booking.model";

export class Agency {
  public createBooking(trip: string, price: number): Booking {
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }
}
