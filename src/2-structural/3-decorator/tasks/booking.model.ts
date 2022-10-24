/* eslint-disable max-params */
export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";
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
