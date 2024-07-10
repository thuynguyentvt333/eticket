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

  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const errorMessage = useSelector((state) => state.user.error);
  const role = useSelector((state) => state.user.role);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginCompleted, setLoginCompleted] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showVerifyOTPPopup, setShowVerifyOTPPopup] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  // const [oldPassword, setOldPassword] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUserAction(email, password));
      if (loginCompleted === false) {
        setLoginCompleted(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // const handleChangePassword = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/account/change-pasword', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include', // Include cookies in the request
  //       body: JSON.stringify({ 
  //         oldPassword: oldPassword,
  //         newPassword: newPassword 
  //       }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       toast.success(data.message);
  //       setOldPassword('');
  //       setNewPassword('');
  //       setConfirmPassword('');
  //       setShowChangePasswordPopup(false); 
  //       // You might want to log the user out or navigate to the login page
  //       // after successful password change
  //     } else {
  //       toast.error(data.message || 'Failed to change password');
  //     }
  //   } catch (error) {
  //     toast.error('An error occurred');
  //   }
  // };
  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://localhost:8080/account/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        
          
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:8080/account/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          credentials: 'include',
        body: JSON.stringify({
          email: forgotPasswordEmail,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        
          setShowVerifyOTPPopup(true);
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/account/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
          },
          credentials: 'include',
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setNewPassword('');
          setConfirmPassword('');
          navigate('/login');
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  useEffect(() => {
    if (loginCompleted && isLoggedIn) {
      toast.success('Login success!');
      const from = location.state?.from || '/';
      if (role === 'USER') {
        navigate(from, { replace: true });
      } else if (role === 'MERCHANT USER') {
        navigate(from, { replace: true });
      } else if (role === 'ADMIN') {
        navigate('/admin');
      }
    } else if (loginCompleted) {
      toast.error('Username or password is incorrect!');
      setLoginCompleted(false);
    }
  }, [loginCompleted]);

  return (
    <div className="container ">
      <div className="change">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div className="card-footer text-center">
            {/* <div>
        <button onClick={() => setShowChangePasswordPopup(true)}>
          Change Password?
        </button>
      </div> */}
              <div>
                Don't have an account? <Link to="/register">Register here</Link>
              </div>
              <div>
                <button className='forgotPass' onClick={() => setShowForgotPasswordPopup(true)}>
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {showChangePasswordPopup && (
    <div className="popup">
      <div className="popup-content" style={{ backgroundColor: 'lightblue' }}>
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Enter your old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleChangePassword} disabled={newPassword !== confirmPassword}>
          Change Password
        </button>
        <button onClick={() => setShowChangePasswordPopup(false)}>
          Cancel
        </button>
      </div>
    </div>
      )} */}
      
      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <div className="popup">
          <div className="popup-content" style={{ backgroundColor: 'lightblue' }}>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
            />
            <button onClick={handleForgotPassword}>Send OTP</button>
            <button onClick={() => setShowForgotPasswordPopup(false)}>
              Cancel
            </button>

            <h2>Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}/>
              <button onClick={handleVerifyOTP}>Verify</button>  
          </div>
        </div>
      )}

      {/* Verify OTP Popup */}
      {showVerifyOTPPopup && (
        <div className="popup">
          <div className="popup-content" style={{ backgroundColor: 'lightblue' }}>
            
            
           
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
       
            <button onClick={handleResetPassword}>Update Password</button>
            <button onClick={() => setShowVerifyOTPPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;