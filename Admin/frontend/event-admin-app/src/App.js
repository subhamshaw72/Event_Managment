import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddEvent from "./AddEvent";
import ManageEvent from "./ManageEvent";
import Profile from "./Profile";
import Home from "./Home";
import AddProduct from "./AddProduct";
import ManageProduct from "./ManageProduct";
import UpdateProduct from "./UpdateProduct";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./protect";
import User from "./User";
import About from "./About";
import Manageabout from "./Manageabout";
import Updateabout from "./Updateabout";

function App() {
  return (
    <>
      <div>
        {/* Page Wrapper */}
        <div id="wrapper">
          <Router>
            {/* Sidebar */}
            <ProtectedRoute>
              <Sidebar></Sidebar>
            </ProtectedRoute>

            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* Main Content */}
              <div id="content">
                {/* Topbar */}
                <ProtectedRoute>
                  <Topbar></Topbar>
                </ProtectedRoute>

                {/* End of Topbar */}
                {/* Begin Page Content */}

                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home></Home>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    exact
                    path="/updateabout"
                    element={
                      <ProtectedRoute>
                        <Updateabout></Updateabout>
                      </ProtectedRoute>
                    }
                  ></Route>

                  <Route
                    exact
                    path="/about"
                    element={
                      <ProtectedRoute>
                        <About></About>
                      </ProtectedRoute>
                    }
                  ></Route>

                  <Route
                    exact
                    path="/manageabout"
                    element={
                      <ProtectedRoute>
                        <Manageabout></Manageabout>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    exact
                    path="/addevent"
                    element={
                      <ProtectedRoute>
                        <AddEvent></AddEvent>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    exact
                    path="/manageevent"
                    element={
                      <ProtectedRoute>
                        <ManageEvent></ManageEvent>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    exact
                    path="/addproduct"
                    element={
                      <ProtectedRoute>
                        <AddProduct></AddProduct>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    exact
                    path="/manageproduct"
                    element={
                      <ProtectedRoute>
                        <ManageProduct></ManageProduct>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    exact
                    path="/updateproduct"
                    element={
                      <ProtectedRoute>
                        <UpdateProduct></UpdateProduct>
                      </ProtectedRoute>
                    }
                  ></Route>

                  <Route
                    exact
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile></Profile>
                      </ProtectedRoute>
                    }
                  ></Route>

                  <Route
                    exact
                    path="/user"
                    element={
                      <ProtectedRoute>
                        <User></User>
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route exact path="/login" element={<Login></Login>}></Route>
                  {/* <Route exact path="/signup" element={<Signup></Signup>}></Route> */}
                </Routes>

                {/* /.container-fluid */}
              </div>
              {/* End of Main Content */}
              {/* Footer */}
              <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Eventopia</span>
                  </div>
                </div>
              </footer>
              {/* End of Footer */}
            </div>
          </Router>
          {/* End of Content Wrapper */}
        </div>

        {/* End of Page Wrapper */}
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        {/* Logout Modal*/}
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
