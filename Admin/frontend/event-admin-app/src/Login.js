import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('https://event-managment-admin-backend-1.onrender.com/adminserver/Loginadmin', {
      email: email,
      password: password,
    })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('email', email);
        window.location.href = "/";
      })
      .catch(error => {
        console.error(error);
        setError(error.response.data.message || 'Login failed');
      });
  };

  const requestPasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://event-managment-admin-backend-1.onrender.com/adminserver/requestUpdatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.message === 'OTP sent to your email') {
        setAlertMessage('OTP sent to your email');
        setAlertType('success');
        setStep(2);
      } else {
        setAlertMessage(data.message);
        setAlertType('danger');
      }
    } catch (error) {
      setAlertMessage('An error occurred while requesting password reset.');
      setAlertType('danger');
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://event-managment-admin-backend-1.onrender.com/adminserver/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await response.json();
      if (data.message === 'Password updated successfully') {
        setAlertMessage('Password updated successfully');
        setAlertType('success');
        setShowForgotPassword(false);
        setStep(1);
      } else {
        setAlertMessage(data.message);
        setAlertType('danger');
      }
    } catch (error) {
      setAlertMessage('An error occurred while resetting password.');
      setAlertType('danger');
    }
  };

  return (
    <div className='img'>
      <div className="login-page ">
        <div className="form">
          {!showForgotPassword ? (
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">login</button>
              {error && <div className="error">{error}</div>}
              <p className="message">
                Forgot password?{' '}
                <a href="#" onClick={() => setShowForgotPassword(true)}>Reset it here</a>
              </p>
            </form>
          ) : (
            <form className="login-form" onSubmit={step === 1 ? requestPasswordReset : resetPassword}>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {step === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </>
              )}
              <button type="submit">{step === 1 ? 'Send OTP' : 'Reset Password'}</button>
              <button type="button" onClick={() => setShowForgotPassword(false)}>Cancel</button>
              {alertMessage && <div className={`alert ${alertType}`}>{alertMessage}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
