import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css'; 
const  App =()=> {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isAdmin = useSelector(state => state.user.role === 'ADMIN');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin/*" element={isLoggedIn && isAdmin ? <AdminRoutes /> : <Navigate to="/login" />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
