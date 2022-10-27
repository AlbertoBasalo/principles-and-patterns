// ! npm run 3-3-3
import { Command, Invoker } from "./invoker";
import { Agency, Booking } from "./receiver";

// * commands classes
// * can be a kind of adapters
// * wrapping the receiver(the agency in this case)

export class BookingTripCommand implements Command {
  public receiver = new Agency();

  constructor(public payload: string) {}

  public execute(): string {
    const result = this.receiver.createBooking(this.payload);
    return JSON.stringify(result);
  }
}

export class CancelTripCommand implements Command {
  public receiver = new Agency();
  public payload: Booking;

  constructor(payload: string) {
    const bookingAsBooking = JSON.parse(payload) as Booking;
    if (!bookingAsBooking) {
      throw new Error("Invalid payload");
    }
    this.payload = bookingAsBooking;
  }

  public execute(): string {
    const result = this.receiver.cancelBooking(this.payload);
    return JSON.stringify(result);
  }
}

export class Client {
  public static main() {
    const invoker = new Invoker();
    const booking = invoker.dispatch(new BookingTripCommand("Trip to Mars"));
    invoker.dispatch(new CancelTripCommand(booking));
    // ! alternate way if available
    invoker.dispatch(new BookingTripCommand("Trip to The Moon"));
    invoker.undo();
    invoker.printHistory();
  }
}

Client.main();
