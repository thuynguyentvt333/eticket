import React, { useState } from 'react';
import './RegisterPage.scss';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        role: 'user', // Default role is user
        merchantInfor: {
            name: '',
            address: '',
            phone: '',
            license: ''
        }
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role') {
            // Reset merchant info when role changes
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                merchantInfor: {
                    name: '',
                    address: '',
                    phone: '',
                    license: ''
                }
            }));
        } else if (name.startsWith('merchantInfor.')) {
            const field = name.split('.')[1];
            setFormData(prevState => ({
                ...prevState,
                merchantInfor: {
                    ...prevState.merchantInfor,
                    [field]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("checkata: ", formData);

        try {
            // Modify data before sending if user role is 'user'
            const dataToSend = { ...formData };
            if (dataToSend.role === 'user') {
                delete dataToSend.merchantInfor;
            }

            const response = await axios.post('http://localhost:8080/account/sign-up', dataToSend);
            toast.success("Register success!");
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again later.");
            if (!error.response) {
                alert('Could not connect to the server. Please check your network connection.');
            }
        }
    };

    return (
        <div className='content-register'>
            <div className="col-md-6">
                <div className="card mt-5">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" id="role" name="role" value={formData.role} onChange={handleChange}>
                                    <option value="user">User</option>
                                    <option value="merchant">Merchant</option>
                                </select>
                            </div>

                            {formData.role === 'merchant' && (
                                <>
                                    <h4>Merchant Information</h4>
                                    <div className="mb-3">
                                        <label htmlFor="merchantInfor.name" className="form-label">Merchant Name</label>
                                        <input type="text" className="form-control" id="merchantInfor.name" name="merchantInfor.name" value={formData.merchantInfor.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="merchantInfor.address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="merchantInfor.address" name="merchantInfor.address" value={formData.merchantInfor.address} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="merchantInfor.phone" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="merchantInfor.phone" name="merchantInfor.phone" value={formData.merchantInfor.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="merchantInfor.license" className="form-label">License</label>
                                        <input type="text" className="form-control" id="merchantInfor.license" name="merchantInfor.license" value={formData.merchantInfor.license} onChange={handleChange} required />
                                    </div>
                                </>
                            )}
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;