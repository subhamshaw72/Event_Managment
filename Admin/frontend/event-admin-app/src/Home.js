import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState({});
  const [bookingData, setBookingData] = useState({});
  const [acceptedEvents, setAcceptedEvents] = useState(0);
  const [pendingEvents, setPendingEvents] = useState(0);
  const [rejectedEvents, setRejectedEvents] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0); // New state for total events

  useEffect(() => {
    // Fetch total number of users
    axios.get('http://localhost:8000/userserver/getAlluser')
      .then(response => {
        const totalUsers = response.data.length;
        setUserData({ totalUsers });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch total number of bookings
    axios.get('http://localhost:8000/Bookserver/getAllbooking')
      .then(response => {
        const totalBookings = response.data.length;
        setBookingData({ totalBookings });

        // Calculate accepted, pending, and rejected events
        const accepted = response.data.filter(booking => booking.status === 'accepted').length;
        const pending = response.data.filter(booking => booking.status === 'pending').length;
        const rejected = response.data.filter(booking => booking.status === 'rejected').length;

        setAcceptedEvents(accepted);
        setPendingEvents(pending);
        setRejectedEvents(rejected);

        // Calculate total events
        const total = accepted + pending + rejected;
        setTotalEvents(total);
      })
      .catch(error => {
        console.error('Error fetching booking data:', error);
      });

    // Fetch total number of events from backend
    axios.get('http://localhost:8000/Manage/getAllProducts2')
      .then(response => {
        const { totalEvents } = response.data;
        setTotalEvents(totalEvents);
      })
      .catch(error => {
        console.error('Error fetching total events:', error);
      });
  }, []);

  return (
    <>
      {/* Begin Page Content */}
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        {/* Content Row */}
        <div className="row">
          {/* Total Users Card */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Users
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{userData.totalUsers}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-users fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total Events Booked Card */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Total Events Booked
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{bookingData.totalBookings}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar-check fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total Accepted Events Card */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total Accepted Events</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{acceptedEvents}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-check-circle fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total Pending Events Card */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Total Pending Events</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{pendingEvents}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-hourglass-half fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total Events Card */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-danger shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Total Events</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalEvents}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
