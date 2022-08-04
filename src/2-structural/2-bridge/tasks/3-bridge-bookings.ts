export interface Operator {
  getAvailableSeats(flightId: string): number;
  getPrice(flightId: string): number;
  createBooking(flightId: string, passengers: number): string;
}

export class SpaceX implements Operator {
  public getAvailableSeats(flightId: string): number {
    return 10;
  }
  public getPrice(flightId: string): number {
    return 100;
  }
  public createBooking(flightId: string, passengers: number): string {
    return `🚀 SpaceX Booking for ${flightId} with ${passengers} passengers`;
  }
}

export class BlueOrigin implements Operator {
  public getAvailableSeats(flightId: string): number {
    return 2;
  }
  public getPrice(flightId: string): number {
    return 10 - this.getAvailableSeats(flightId);
  }
  public createBooking(flightId: string, passengers: number): string {
    return `🚀 BlueOrigin Booking for ${flightId} with ${passengers} passengers`;
  }
}

export interface Agency {
  makePayment(amount: number): void;
  bookTrip(flightId: string, passengers: number): string;
}

export class SpaceTravels implements Agency {
  private readonly operator: Operator;
  constructor() {
    this.operator = new SpaceX();
  }
  public makePayment(amount: number): void {
    console.log("💸 Agency making payment :" + amount);
  }
  public bookTrip(flightId: string, passengers: number): string {
    if (this.operator.getAvailableSeats(flightId) < passengers) {
      throw new Error("Not enough seats");
    }
    const amount = this.operator.getPrice(flightId) * passengers;
    this.makePayment(amount);
    return this.operator.createBooking(flightId, passengers);
  }
}

export class AstroidBookings implements Agency {
  private readonly operator: Operator;
  constructor() {
    this.operator = new BlueOrigin();
  }
  public makePayment(amount: number): void {
    console.log("💸 Agency making payment :" + amount);
  }
  public bookTrip(flightId: string, passengers: number): string {
    if (this.operator.getAvailableSeats(flightId) < passengers) {
      throw new Error("Not enough seats");
    }
    const amount = this.operator.getPrice(flightId) * passengers;
    this.makePayment(amount);
    return this.operator.createBooking(flightId, passengers);
  }
}
export class Client {
  constructor() {}
  public goToMars(): string {
    const agency: Agency = new SpaceTravels();
    return agency.bookTrip("Mars", 2);
  }
  public goToTheEarthOrbit(): string {
    const agency: Agency = new AstroidBookings();
    return agency.bookTrip("Earth Orbit", 2);
  }
}

const client = new Client();
console.log(client.goToMars());
console.log(client.goToTheEarthOrbit());
