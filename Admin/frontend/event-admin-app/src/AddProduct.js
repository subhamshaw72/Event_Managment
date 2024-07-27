import { useEffect, useState } from "react";
import axios from 'axios';

function AddProduct() {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading state

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get('https://event-managment-admin-backend-1.onrender.com/Bookserver/getAllbooking');
                setBookings(res.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setMessage('Failed to fetch bookings');
            }
        };

        fetchBookings();
    }, []);

    const acceptBooking = async (id) => {
        try {
            setLoading(true); // Start loading

            const res = await axios.post(`http://localhost:8000/Bookserver/acceptorder/${id}`);
            setBookings(bookings.map(booking =>
                booking._id === id ? { ...booking, status: 'accepted' } : booking
            ));
            setMessage(res.data.message);
        } catch (error) {
            console.error('Error accepting booking:', error);
            setMessage('Error accepting booking');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const rejectBooking = async (id) => {
        const confirmCancel = window.confirm("Are you sure you want to reject this event?");
        if (!confirmCancel) {
            return;
        }
        try {
            setLoading(true); // Start loading

            const res = await axios.post(`http://localhost:8000/Bookserver/rejectorder/${id}`);
            setBookings(bookings.filter(booking => booking._id !== id));
            setMessage(res.data.message);
        } catch (error) {
            console.error('Error rejecting booking:', error);
            setMessage('Error rejecting booking');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Name of Event</th>
                        <th scope="col">Date of Event</th>
                        <th scope="col">Accept or Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.name}</td>
                                <td>{booking.location}</td>
                                <td>{booking.email}</td>
                                <td>{booking.phone}</td>
                                <td>{booking.Nameofevent}</td>
                                <td>{new Date(booking.Dateofevent).toLocaleDateString()}</td>
                                <td>
                                    {booking.status === 'accepted' ? (
                                        <span className="text-success">Accepted</span>
                                    ) : booking.status === 'rejected' ? (
                                        <span className="text-danger">Rejected</span>
                                    ) : (
                                        <>
                                            <button className="btn btn-success me-2" onClick={() => acceptBooking(booking._id)} disabled={loading}>Accept</button>
                                            <button className="btn btn-danger" onClick={() => rejectBooking(booking._id)} disabled={loading}>Reject</button>
                                            {loading && <span className="ms-2">Processing...</span>}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {message && <p>{message}</p>}
        </>
    );
}

export default AddProduct;
