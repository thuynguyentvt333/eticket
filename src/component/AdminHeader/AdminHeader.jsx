import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './AdminHeader.scss';

const AdminHeader = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const currentUser = useSelector(state => state.user.currentUser);

    const handleLogout = () => {
        // Sau khi đăng xuất, chuyển hướng về trang đăng nhập
        navigate('/login');
    };
    return (
        <div className='admin-header-container'>
            <div className='container'>
                {isLoggedIn && currentUser.group==="admin" && (
                    <div className='text-end'>
                        <div className="dropdown d-inline-block">
                            <button className="btn btn-secondary me-2 dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Hello, {currentUser.fullname}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{ minWidth: '95%' }}>
                                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                <li><Link className="dropdown-item" to="/profile">Thông tin</Link></li>
                                <li><Link className="dropdown-item" to="/">Trang chủ</Link></li>
                            </ul>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
        
    )
};

export default AdminHeader;