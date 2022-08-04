export class SpaceX {
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

export class SpaceTravels {
  private readonly spaceX = new SpaceX();
  private makePayment(amount: number): void {
    console.log("💸 Agency making payment :" + amount);
  }
  public bookTrip(flightId: string, passengers: number): string {
    if (this.spaceX.getAvailableSeats(flightId) < passengers) {
      throw new Error("Not enough seats");
    }
    const amount = this.spaceX.getPrice(flightId) * passengers;
    this.makePayment(amount);
    return this.spaceX.createBooking(flightId, passengers);
  }
}

export class Client {
  private readonly spaceTravels = new SpaceTravels();
  public goToMars(): string {
    return this.spaceTravels.bookTrip("Mars", 2);
  }
}

const client = new Client();
console.log(client.goToMars());
