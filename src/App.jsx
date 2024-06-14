import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';
import { useSelector } from 'react-redux';
// import EventContainer from './component/EventContainer/EventContainer.jsx';
// import FeaturedEvents from './component/FeaturedEvents/FeaturedEvents.jsx';
// import SpecialEvents from './component/SpecialEvents/SpecialEvents.jsx';
import InforEvent from './component/InforEvent/InforEvent';

const  App =()=> {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isAdmin = useSelector(state => state.user.currentUser?.group === 'admin');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin/*" element={isLoggedIn && isAdmin ? <AdminRoutes /> : <Navigate to="/login" />} />
          <Route path="/*" element={<PublicRoutes />} />
          {/* <Route path='/eventinfor' element={<InforEvent/>}></Route> */}
        </Routes>
      </div>
      <ToastContainer />
      {/* <EventContainer/> */}

    </Router>
  );
}

export default App;
