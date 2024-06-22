import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import './AddEvent.scss';
import { toast } from 'react-toastify';

const AddEditEvent = () => {
  const { id } = useParams();
  const token = Cookies.get('token');
  const [categories, setCategories] = useState([]);
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDescription: '',
    eventCity: '',
    eventLocation: '',
    eventBanner: '',
    categories: [],
    eventLimit: '',
  });
  const [ticketDetails, setTicketDetails] = useState({
    startTime: '',
    endTime: '',
    startBooking: '',
    endBooking: '',
    ticketTypes: [
      { typeName: '', price: '', quantity: '' },
      { typeName: '', price: '', quantity: '' },
    ],
  });
  const [step, setStep] = useState(1);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    if (id) {
      toast.info("ĐANG MỞ CHỨC NĂNG UPDATE EVENT");
    }
    else {
      toast.info("ĐANG MỞ CHỨC NĂNG Create EVENT");
    }

    axios.get('http://localhost:8080/home/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [token, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (step === 1) {
      setEventDetails({ ...eventDetails, [name]: value });
    } else {
      setTicketDetails({ ...ticketDetails, [name]: value });
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setEventDetails(prevState => {
      const updatedCategories = isChecked
        ? [...prevState.categories, value]
        : prevState.categories.filter(category => category !== value);
      return { ...prevState, categories: updatedCategories };
    });
  };

  const handleTicketTypeChange = (index, e) => {
    const { name, value } = e.target;
    const newTicketTypes = [...ticketDetails.ticketTypes];
    newTicketTypes[index][name] = value;
    setTicketDetails({ ...ticketDetails, ticketTypes: newTicketTypes });
  };

  const handleAddEventStep1 = (e) => {
    e.preventDefault();
    const step1Data = {
      eventName: eventDetails.eventName,
      eventDescription: eventDetails.eventDescription,
      eventCity: eventDetails.eventCity,
      eventLocation: eventDetails.eventLocation,
      eventBanner: eventDetails.eventBanner || 'Not found',
      categories: eventDetails.categories,
      eventLimit: eventDetails.eventLimit,
    };

    console.log("Step 1 Data: ", step1Data); // Log để kiểm tra dữ liệu gửi lên

    axios.post('http://localhost:8080/merchant/add-event', step1Data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Đảm bảo rằng cookie được gửi kèm
    })
      .then(response => {
        if (response.data.code === 1000) {
          const sessionIdFromResponse = Cookies.get('JSESSIONID');
          setSessionId(sessionIdFromResponse);
          setStep(2);
        }
      })
      .catch(error => {
        console.error('Error creating event (Step 1):', error.response ? error.response.data : error.message);
      });
  };

  const handleAddEventStep2 = (e) => {
    e.preventDefault();
    const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      return date.toISOString().replace('T', ' ').substring(0, 19);
    };

    const step2Data = {
      start_time: formatDateTime(ticketDetails.startTime),
      end_time: formatDateTime(ticketDetails.endTime),
      start_booking: formatDateTime(ticketDetails.startBooking),
      end_booking: formatDateTime(ticketDetails.endBooking),
      ticketTypeRequests: ticketDetails.ticketTypes,
    };

    console.log("Step 2 Data: ", step2Data); // Log để kiểm tra dữ liệu gửi lên

    axios.post('http://localhost:8080/merchant/add-event-ticket', step2Data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${sessionId}` // Gửi cookie JSESSIONID
      },
      withCredentials: true, // Đảm bảo rằng cookie được gửi kèm
    })
      .then(response => {
        if (response.data.code === 1000) {
          alert('Event added successfully. Please wait for approval.');
        }
      })
      .catch(error => {
        console.error('Error creating event (Step 2):', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="add-event-container">
      <h2>Create New Event</h2>
      {step === 1 && (
        <form onSubmit={handleAddEventStep1}>
          <div>
            <label>Event Name</label>
            <input type="text" name="eventName" value={eventDetails.eventName} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Description</label>
            <input type="text" name="eventDescription" value={eventDetails.eventDescription} onChange={handleInputChange} required />
          </div>
          <div>
            <label>City</label>
            <input type="text" name="eventCity" value={eventDetails.eventCity} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Location</label>
            <input type="text" name="eventLocation" value={eventDetails.eventLocation} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Event Limit</label>
            <input type="number" name="eventLimit" value={eventDetails.eventLimit} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Categories</label>
            {categories.map(category => (
              <div key={category.id}>
                <input
                  type="checkbox"
                  value={category.id}
                  onChange={handleCategoryChange}
                />
                <label>{category.category_name}</label>
              </div>
            ))}
          </div>
          <button type="submit">Next</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleAddEventStep2}>
          <div>
            <label>Start Time</label>
            <input type="datetime-local" name="startTime" value={ticketDetails.startTime} onChange={handleInputChange} required />
          </div>
          <div>
            <label>End Time</label>
            <input type="datetime-local" name="endTime" value={ticketDetails.endTime} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Start Booking</label>
            <input type="datetime-local" name="startBooking" value={ticketDetails.startBooking} onChange={handleInputChange} required />
          </div>
          <div>
            <label>End Booking</label>
            <input type="datetime-local" name="endBooking" value={ticketDetails.endBooking} onChange={handleInputChange} required />
          </div>
          {ticketDetails.ticketTypes.map((ticket, index) => (
            <div key={index}>
              <label>Ticket Type {index + 1}</label>
              <input type="text" name="typeName" placeholder="Type Name" value={ticket.typeName} onChange={(e) => handleTicketTypeChange(index, e)} required />
              <input type="number" name="price" placeholder="Price" value={ticket.price} onChange={(e) => handleTicketTypeChange(index, e)} required />
              <input type="number" name="quantity" placeholder="Quantity" value={ticket.quantity} onChange={(e) => handleTicketTypeChange(index, e)} required />
            </div>
          ))}
          <button type="submit">Create Event</button>
        </form>
      )}
    </div>
  );
};

export default AddEditEvent;
