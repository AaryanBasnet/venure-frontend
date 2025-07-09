import React from "react";
import { useMyBookings } from "../../hooks/owner/useMyBookings";

export default function MyBookings() {
  const { data: bookings = [], isLoading, isError, error } = useMyBookings();

  if (isLoading)
    return <div className="text-center py-20">Loading your bookings...</div>;
  if (isError)
    return (
      <div className="text-center text-red-600 py-20">
        Error: {error.message}
      </div>
    );

  if (bookings.length === 0)
    return <p className="text-center py-20">You have no bookings yet.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-center mb-10">My Bookings</h1>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold">{booking.venue.name}</h2>
            <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
            <p>Time Slot: {booking.timeSlot}</p>
            <p>Guests: {booking.numberOfGuests}</p>
            <p>
              Status: <span className="capitalize">{booking.status}</span>
            </p>
            <p>Total: Rs. {booking.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
