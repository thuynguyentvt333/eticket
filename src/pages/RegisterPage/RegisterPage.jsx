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
        role: [],
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "role") {
            setFormData(prevState => ({
                ...prevState,
                role: [...prevState.role, value]
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
        console.log("checkata: ", formData)
      
        try {
          // Gửi dữ liệu form đến server bằng Axios
          const response = await axios.post('http://localhost:8080/account/sign-up', formData);
          toast.success("Register success!");
            navigate('/login');
        } catch (error) {
          // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
            console.error(error);
            toast.error("có lỗi rồi");
            if (!error.response) {
                // Lỗi kết nối mạng
                alert('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng của bạn.');
              }
        }
      };

    return (
        <div className="container my-5 container-register">
            <div className='content-register'>
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body"  >
                            <h2 className="card-title text-center mb-4">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label">email</label>
                                    <input type="email" className="form-control" id="text" name="email" value={formData.text} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">UserName</label>
                                    <input type="text" className="form-control" id="username" name="username" value={formData.userName} onChange={handleChange} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select className="form-select" id="role" name="role" value={formData.role} onChange={handleChange}>
                                        <option value="">Select role</option>
                                        <option value="user">User</option>
                                        <option value="merchant">Merchant</option>
                                        {/* <option value="">Mt</option> */}
                                    </select>
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                                </div> */}
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
