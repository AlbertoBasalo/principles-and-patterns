// ! npm run 2-3-2
import { Agency } from "./agency";
import { Booking } from "./booking.model";
export class Client {
  private agency: Agency;

  constructor() {
    this.agency = new Agency();
  }

  public createBooking(trip: string, price: number): Booking {
    return this.agency.createBooking(trip, price);
  }
  public cancelBooking(booking: Booking): Booking {
    // ToDo: 😱 add this new functionality without changing Agency implementation
    return booking;
  }
}

const client = new Client();
const booking = client.createBooking("Paris", 100);
console.log("📅 booking created: ", booking);
const bookingCancelled = client.cancelBooking(booking);
console.log("❌ booking cancelled: ", bookingCancelled);
