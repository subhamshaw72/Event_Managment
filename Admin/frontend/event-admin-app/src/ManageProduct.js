import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const ManageProduct = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/userserver/getAlluser');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setMessage('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch(`http://localhost:8000/userserver/deleteuser/${id}`, requestOptions);
                const data = await response.json();

                setUsers(users.filter(user => user._id !== id));
                setMessage(data.message);
            } catch (error) {
                console.error('Error deleting user:', error);
                setMessage('Error deleting user');
            }
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-image">
                            <thead>
                                <tr>
                                    <th scope="col">S. No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.contact}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button className="btn btn-danger m-2" onClick={() => deleteUser(user._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageProduct;
