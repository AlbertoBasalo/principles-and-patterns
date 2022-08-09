type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";
export class Booking {
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

export interface BookingCreation {
  createBooking(trip: string, price: number): Booking;
}

export class Agency implements BookingCreation {
  public createBooking(trip: string, price: number): Booking {
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }
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

export class AgencyCanceller implements BookingCreation {
  constructor(private agency: Agency) {}

  public createBooking(trip: string, price: number): Booking {
    return this.agency.createBooking(trip, price);
  }
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
