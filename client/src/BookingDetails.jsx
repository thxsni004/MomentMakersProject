import React, { useEffect, useState } from "react";

function BookingDetails() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch("http://localhost:3001/bookings"); // Adjust API URL if needed
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to fetch bookings");
                }

                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);
    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <h2>All Bookings</h2>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <strong>User Name:</strong> {booking.username} <br />
                            <strong>User Email:</strong> {booking.userid} <br />
                            <strong>User Phone:</strong> {booking.userphone} <br />
                            <strong>Event:</strong> {booking.programName} <br />
                            <strong>Event Date:</strong> {booking.date} <br />
                            <strong>VIP:</strong> {booking.vipBooking ? "Yes" : "No"} <br />
                            <strong>Amount:</strong> {booking.totalAmount} <br />
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
  )
}

export default BookingDetails
