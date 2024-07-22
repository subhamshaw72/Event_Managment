import React, { useEffect, useState } from 'react';
import './User.css';

function User() {
  const [messages, setMessages] = useState([]);
  const [userResponse, setUserResponse] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8000/contactserver/getallmessages');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleResponseSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('http://localhost:8000/contactserver/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: selectedMessage.email, response: userResponse })
      });

      if (!response.ok) {
        throw new Error('Failed to send response');
      }

      const data = await response.json();
      setSuccessMessage('Response sent successfully!');
      
      // Clear response state and reset selectedMessage after successful submission
      setUserResponse('');
      setSelectedMessage(null);

      // Update the message list to reflect the responded message
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.email === selectedMessage.email ? { ...msg, response: userResponse } : msg
        )
      );
    } catch (error) {
      console.error('Error sending response:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={msg._id}>
              <th scope="row">{index + 1}</th>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>
                {msg.response ? (
                  <button className="btn btn-secondary" disabled>Responded</button>
                ) : (
                  <button className="btn btn-primary" onClick={() => {
                    setSelectedMessage(msg);
                    setSuccessMessage(''); // Clear any previous success message
                  }}>Respond</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMessage && (
        <div className="response-form">
          <h2>Respond to {selectedMessage.name}</h2>
          <form onSubmit={handleResponseSubmit}>
            <div className="form-group">
              <label htmlFor="response">Your Response:</label>
              <textarea
                id="response"
                className="form-control"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Response'}
            </button>
          </form>
          {successMessage && (
            <div className="alert alert-success" role="alert" style={{ marginTop: '10px' }}>
              {successMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
