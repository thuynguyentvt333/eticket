import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../../redux/actions/UserAction/userActions';
import { toast } from 'react-toastify';
import '../LoginPage/LoginPage.scss';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy currentUser từ state của Redux
    const currentUser = useSelector(state => state.user.currentUser);  
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const errorMessage = useSelector(state => state.user.error);
    const role = useSelector(state => state.user.role);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginCompleted, setLoginCompleted] = useState(false); // Biến cờ đánh dấu đã đăng nhập hoàn thành hay chưa

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUserAction(email, password));
            if (loginCompleted === false) {
                setLoginCompleted(true);
            }
        } catch (error) {
            // Xử lý lỗi nếu cần
            setError(error.message);
        }
    };

    useEffect(() => {
        if (loginCompleted && isLoggedIn) {
            toast.success("Login success!");
            if (role === "USER") {
                navigate("/");
            }
            else if (role === "USER MERCHANT") {
                navigate("/");
            }
            else if (role === "ADMIN") {
                navigate("/admin");
            }
        } else if (loginCompleted){
            toast.error("Username or password is incorrect!");
            setLoginCompleted(false);
        }
    }, [loginCompleted]);

    return (
        <div className="container ">
            <div className='change'>
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
