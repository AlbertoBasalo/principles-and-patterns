// ! npm run 1-2-3

import { BookingStatus } from "./booking-status.type";

class Booking {
  // * private properties for internal use only
  private _id: string = Date.now().toString();
  public get id(): string {
    return this._id;
  }
  private _createdOn: Date = new Date();
  public get createdOn(): Date {
    return this._createdOn;
  }
  public readonly updatedOn: Date | null = null;

  // * make everything immutable by marking properties as readonly
  // eslint-disable-next-line max-params
  constructor(
    public readonly destination: string,
    public readonly departureDate: Date,
    public readonly price: number,
    public readonly status: BookingStatus = "Pending"
  ) {}

  public clone(mutations: Partial<Booking>): Booking {
    // * creates a new one copy (clone)
    const clone: Booking = this.getDeepClone();
    // * mutate the clone
    const mutatedClone = Object.assign(clone, mutations);
    return mutatedClone;
  }
  private getDeepClone(): Booking {
    const clone = new Booking(this.destination, this.departureDate, this.price, this.status);
    clone._id = this.id;
    clone._createdOn = this.createdOn;
    return clone;
  }

  public cancel(): Booking {
    // * business logic inside the object
    const cancelledBooking = this.clone({ status: "Cancelled", updatedOn: new Date() });
    return cancelledBooking;
  }
}

class App {
  public createBooking(): Booking {
    const booking = new Booking("🌖 The Moon", new Date(), 100);
    // booking.destination = "🌍 The Earth"; // * error
    return booking;
  }

  public cancelBookingClone(booking: Booking): Booking {
    // * Send mutations
    const cancelled = booking.clone({ status: "Cancelled", updatedOn: new Date() });
    // cancelled.destination = "🌍 The Earth"; // * error
    return cancelled;
  }

  public cancelBooking(booking: Booking): Booking {
    // * expect mutations inside
    const cancelled = booking.cancel();
    // cancelled.destination = "🌍 The Earth"; // * error
    return cancelled;
  }
}

const app = new App();
const booking = app.createBooking();
console.log("🚀 Creating a Booking:", booking);
const cancelled = app.cancelBooking(booking);
console.log("🌍 Cancelling a booking:", cancelled);
// * original record is preserved; operation can be undone and tracked
console.log("🔭 Original Booking:", booking);
