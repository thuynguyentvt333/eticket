import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/js/dist/dropdown';

const Header = () => {
  const navigate = useNavigate();

  // Sử dụng hook useSelector để lấy thông tin đăng nhập từ store Redux
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const currentUser = useSelector(state => state.user.currentUser);

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Đăng xuất người dùng
  const handleLogout = () => {
    // Thực hiện các thao tác đăng xuất ở đây, ví dụ dispatch action logout hoặc xóa token, thông tin đăng nhập khỏi local storage, ...

    // Sau khi đăng xuất, chuyển hướng về trang đăng nhập
    navigate('/login');
  };

  return (
    <header className="bg-dark text-light py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            {/* <h1 className="mb-0">Phone Store</h1> */}
          </div>
          <div className="col-md-6">
            <form className="input-group">
              <input type="text" className="form-control" placeholder="Search..." />
              <button className="btn btn-outline-light" type="button">Search</button>
            </form>
          </div>
          <div className="col-md-3 text-end">
            {isLoggedIn ? (
              <div className="dropdown d-inline-block">
              <button className="btn btn-outline-light me-2 dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Hello, {currentUser.fullname}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{ minWidth: '95%' }}>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              </ul>
            </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/register" className="btn btn-primary me-2">Sign Up</Link>
              </>
            )}
            <Link to="/cart" className="btn btn-outline-light position-relative">
              <FaShoppingCart size={20} />
              {totalItems > 0 && <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">{totalItems}</span>}
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <nav>
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Featured</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">New Event</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
