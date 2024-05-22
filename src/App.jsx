import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isAdmin = useSelector(state => state.user.currentUser?.group === 'admin');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin/*" element={isLoggedIn && isAdmin ? <AdminRoutes /> : <Navigate to="/login" />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
