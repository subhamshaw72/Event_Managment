import React from 'react';
import { useState , useNavigate } from 'react';

const Topbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState("");
  
  const handleLogout = () => {
    // Implement your logout functionality here
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setUserEmail("");
    // navigate("/login");
     window.location.href = "/login"
  };

  return (
    <>
      {/* Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars" />
        </button>

        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">Hello, Admin</span>
              <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="Profile" />
            </a>
            {/* Dropdown - User Information */}
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      {/* End of Topbar */}
    </>
  );
}

export default Topbar;
