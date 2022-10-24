/* eslint-disable max-params */
// ! npm run 2-3-3
import { Agency } from "./Agency";
import { Booking } from "./booking.model";

// * 🤩 Decorator pattern needs an interface, but TS don`t force to change implementers
export interface BookingCreator {
  createBooking(trip: string, price: number): Booking;
}

// * 🤩 Decorator class implements the interface and do more...
export class AgencyDecorator implements BookingCreator {
  // * 🤩 favor composition over inheritance
  constructor(private agency: BookingCreator = new Agency()) {}

  // * 🤩 wrap calls to the decorated object
  public createBooking(trip: string, price: number): Booking {
    return this.agency.createBooking(trip, price);
  }
  // * 🤩 add new functionality
  public cancelBooking(booking: Booking): Booking {
    return new Booking(
      booking.id,
      booking.trip,
      booking.user,
      booking.price,
      "Cancelled",
      booking.createdAt,
      new Date()
    );
  }
}

export class Client {
  private agency: AgencyDecorator;

  constructor() {
    // ! could use a creational pattern to create the decorated object
    this.agency = new AgencyDecorator(new Agency());
  }

  public createBooking(trip: string, price: number): Booking {
    // * 🤩 no changes to already working code
    return this.agency.createBooking(trip, price);
  }
  public cancelBooking(booking: Booking): Booking {
    // * 🤩 add new functionality
    return this.agency.cancelBooking(booking);
  }
}

const client = new Client();
const booking = client.createBooking("Paris", 100);
console.log("📅 booking created: ", booking);
const bookingCancelled = client.cancelBooking(booking);
console.log("❌ booking cancelled: ", bookingCancelled);
