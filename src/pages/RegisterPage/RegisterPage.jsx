import React, { useState } from 'react';
import './RegisterPage.scss';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullname: '',
        address: '',
        sex: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý việc submit form ở đây, gửi dữ liệu formData đi đâu đó
        console.log(formData);
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
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
                                    <label htmlFor="fullname" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sex" className="form-label">Sex</label>
                                    <select className="form-select" id="sex" name="sex" value={formData.sex} onChange={handleChange}>
                                        <option value="">Select Sex</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
