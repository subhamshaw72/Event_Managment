import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function val(event) {
    event.preventDefault(); // Prevent form from submitting immediately

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;
    var pass = document.getElementById('pass').value;
    var cpass = document.getElementById('cpass').value;
    var text;
    setError('');
    setSuccess(false);

    if (name.length < 6) {
      text = 'Name should be more than 6 characters';
      setError(text);
      return false;
    }
    if (email.indexOf('@') === -1 || email.length < 6) {
      text = 'Your email is invalid.';
      setError(text);
      return false;
    }
    if (pass.length < 8) {
      text = 'Password should be more than 8 characters';
      setError(text);
      return false;
    }
    if (pass !== cpass) {
      text = 'Password does not match';
      setError(text);
      return false;
    }

    axios.post('http://localhost:8000/adminserver/adminregister', {
      name: name,
      email: email,
      password: pass,
      phone: number,
    })
      .then(response => {
        setSuccess(true);
        navigate('/login'); // Navigate to the login page
      })
      .catch(error => {
        setError(error.response.data.message || 'Error occurred while registering');
      });

    return false;
  }

  return (
    <div>
      <div className="wrapper">
        <h2 id="hid">Registration Form</h2>
        <div id="error_message" className="fixed-height" style={{ padding: error ? '10px' : '0', display: error ? 'block' : 'none', color: 'red' }}>
          {error}
        </div>
        <div id="success_message" className="fixed-height" style={{ display: success ? 'block' : 'none', color: 'green' }}>
          Admin registered successfully!
        </div>
        <form id="myform" name="form" onSubmit={val}>
          <div className="input_field">
            <input type="text" placeholder="Name" id="name" />
          </div>
          <div className="input_field">
            <input type="text" placeholder="Email" id="email" />
          </div>
          <div className="input_field">
            <input type="number" placeholder="Number" id="number" />
          </div>
          <div className="input_field">
            <input type="password" placeholder="Password" id="pass" />
          </div>
          <div className="input_field">
            <input type="password" placeholder="Confirm Password" id="cpass" />
          </div>
          <input type="submit" value="submit" />
          <div class="container mt-1 ms-0">
        <p className='text-dark'>Already register <a href="#"  onClick = {()=>navigate('/login')} class="btn btn-outline-primary">Login</a></p>
                 </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
