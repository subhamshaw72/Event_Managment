import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    setIsAuthenticated(!!email); // Convert email presence into a boolean value
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <>
      {/* Sidebar */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">Event Management</div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Nav Item - Events */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEvents" aria-expanded="true" aria-controls="collapseEvents">
            <i className="fas fa-fw fa-calendar" />
            <span>Events</span>
          </a>
          <div id="collapseEvents" className="collapse" aria-labelledby="headingEvents" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/addevent">Add Event</Link>
              <Link className="collapse-item" to="/manageevent">Manage Event</Link>
            </div>
          </div>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Nav Item - About */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAbout" aria-expanded="true" aria-controls="collapseAbout">
            <i className="fas fa-fw fa-info-circle" />
            <span>About</span>
          </a>
          <div id="collapseAbout" className="collapse" aria-labelledby="headingAbout" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/about">Add About</Link>
              <Link className="collapse-item" to="/manageabout">Manage About</Link>
            </div>
          </div>
        </li>

        {/* Nav Item - Booking & User */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
            <i className="fas fa-fw fa-wrench" />
            <span>Booking & User</span>
          </a>
          <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/addproduct">Booking</Link>
              <Link className="collapse-item" to="/manageproduct">All user</Link>
              <Link className="collapse-item" to="/user">UserQuery</Link>
            </div>
          </div>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}
        <div className="sidebar-heading">
          Addons
        </div>

        {/* Nav Item - Pages */}
        {!isAuthenticated && (
          <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
              <i className="fas fa-fw fa-folder" />
              <span>Pages</span>
            </a>
            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Login Screens:</h6>
                <Link className="collapse-item" to="/login">Login</Link>
              </div>
            </div>
          </li>
        )}

        {isAuthenticated && (
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt" />
              <span>Logout</span>
            </button>
          </li>
        )}

        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* Sidebar Toggler (Sidebar) */}
       
      </ul>
      {/* End of Sidebar */}
    </>
  );
};

export default Sidebar;
