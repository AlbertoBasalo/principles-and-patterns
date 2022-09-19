// ! interface operator allows us to work with different operators
export interface Operator {
  getAvailableSeats(flightId: string): number;
  getPrice(flightId: string): number;
  createBooking(flightId: string, passengers: number): string;
}

// ! interface agency allows us to work with different agencies
export interface Agency {
  makePayment(amount: number): void;
  bookTrip(flightId: string, passengers: number): string;
}
export class SpaceX implements Operator {
  constructor() {
    console.log("Spacial flight operator SpaceX ready to work");
  }
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
  constructor() {
    console.log("Spacial flight operator BlueOrigin ready to work");
  }
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

export class SpaceTravels implements Agency {
  private readonly operator: Operator;
  constructor() {
    this.operator = new SpaceX();
    console.log("Space tourism agency SpaceTravels ready to work");
    // ! internally they could be very different
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
    console.log("Space tourism agency AstroidBookings ready to work");
    // ! and evolve independently
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
  // ! externally they behave the same
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
