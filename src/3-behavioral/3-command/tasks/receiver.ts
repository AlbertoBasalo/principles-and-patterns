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

// * receivers are just business objects that implement the logic
// * they do not need to implement nothing related to the command pattern
// * but their methods should be stateless

export class Agency {
  public createBooking(trip: string): Booking {
    console.log(`🛩️ Booking trip: ${trip}`);
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    const price = Math.floor(Math.random() * 100);
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }
  public cancelBooking(booking: Booking): Booking {
    console.log(`😭 Cancelling trip: ${booking}`);
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
