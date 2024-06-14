import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container" >
        <div className="row" style={{width:'100%' , height:'100%' }}>
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>We are a leading online retailer for hight.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Phone: 123-456-789</li>
              <li>Email: info@ticketstore.com</li>
              <li>Address: 123 Main Street, City</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <p>&copy; 2024 ticket Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
