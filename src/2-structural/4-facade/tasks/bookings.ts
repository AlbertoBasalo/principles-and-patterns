export class Bookings {
  public getPrice(trip: string): number {
    return 100;
  }
  public makeBooking(trip: string, payment: string): string {
    return `${trip} with ${payment} booked`;
  }
  public cancelBooking(trip: string, payment: string): string {
    return `${trip} with ${payment} canceled`;
  }
}
