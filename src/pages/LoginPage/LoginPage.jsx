import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../../redux/actions/UserAction/userActions';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy currentUser từ state của Redux
    const currentUser = useSelector(state => state.user.currentUser); 
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const errorMessage = useSelector(state => state.user.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginCompleted, setLoginCompleted] = useState(false); // Biến cờ đánh dấu đã đăng nhập hoàn thành hay chưa

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUserAction(email, password));
            setLoginCompleted(true); // Đánh dấu đã nhấn nút đăng nhập hay chưa

        } catch (error) {
            // Xử lý lỗi nếu cần
            setError(error.message);
        }
    };

    useEffect(() => {
        if (loginCompleted && isLoggedIn && currentUser) {
            const { group } = currentUser;
            if (group === 'customer') {
                navigate('/');
            } else if (group === 'admin') {
                navigate('/admin');
            }
            toast.success("Login success!");
        } else if (loginCompleted && errorMessage) {
            toast.error(errorMessage);
        }
    }, [loginCompleted, isLoggedIn, currentUser, errorMessage, navigate]);

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                        </div>
                        <div className="card-footer text-center">
                            <div>Don't have an account? <Link to="/register">Register here</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
