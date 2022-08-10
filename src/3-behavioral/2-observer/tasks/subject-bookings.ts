import { Observer } from "./observer-logger";

type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";
export class Booking {
  // eslint-disable-next-line max-params
  constructor(
    public id: number,
    public trip: string,
    public user: string,
    public price: number,
    public status: BookingStatus,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

export class Agency {
  public createBooking(trip: string, price: number): Booking {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }
  public cancelBooking(booking: Booking): Booking {
    if (new Date().getFullYear() - booking.createdAt.getFullYear() > 1) {
      throw new Error("Booking is too old to cancel");
    }
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

export interface Observable {
  subscribe(observer: Observer): void;
  notifyObservers(businessEvent: string, message: string): void;
}
/**
 * An Agency wrapper that implements the Observable interface.
 * Is a decorator that adds the subscribe and notifyObservers method to the Agency class.
 * @param {Agency} agency
 */
export class AgencySubject implements Observable {
  private observers: Observer[] = [];
  constructor(private agency: Agency) {}
  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }
  public notifyObservers(businessEvent: string, message: string): void {
    this.observers.forEach(obs => obs.notify(businessEvent, message));
  }
  public createBooking(trip: string, price: number): Booking | undefined {
    try {
      const result = this.agency.createBooking(trip, price);
      this.notifyObservers("booking-created", JSON.stringify(result));
      return result;
    } catch (error) {
      this.notifyObservers("exception", (error as Error).message);
    }
  }
  public cancelBooking(booking: Booking): Booking | undefined {
    try {
      const result = this.agency.cancelBooking(booking);
      this.notifyObservers("booking-cancelled", JSON.stringify(result));
      return result;
    } catch (error) {
      this.notifyObservers("exception", (error as Error).message);
    }
  }
}
