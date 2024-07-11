import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import './AddEvent.scss';
import { toast } from 'react-toastify';

const AddEditEvent = () => {
  const navigate = useNavigate();
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
    ticketTypes: [{ typeName: '', price: '', quantity: '' }, { typeName: '', price: '', quantity: '' }],
  });
  const [step, setStep] = useState(1);
  const [sessionId, setSessionId] = useState('');
  const [editedTicketIndices, setEditedTicketIndices] = useState([]);

  useEffect(() => {
    if (id) {
      toast.info("ĐANG MỞ CHỨC NĂNG UPDATE EVENT");
      fetchEventDetail(id);
    } else {
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

  const fetchEventDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/merchant/update/first-step/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      });

      if (response.data.code === 1000) {
        const eventData = response.data.result;
        const sessionIdFromResponse = Cookies.get('JSESSIONID');
        setSessionId(sessionIdFromResponse);

        setEventDetails({
          eventName: eventData.eventName,
          eventDescription: eventData.eventDescription,
          eventCity: eventData.eventCity,
          eventLocation: eventData.eventLocation,
          eventBanner: eventData.eventBanner,
          categories: eventData.categoriesList.map(category => category.id), // Ensure this is an array of integers
          eventLimit: eventData.eventMaxLimit,
        });
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  }

  const fetchStep2Details = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/merchant/update/second-step/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cookie': `JSESSIONID=${sessionId}`,
        },
        withCredentials: true,
      });

      if (response.data.code === 1000) {
        const step2Data = response.data.result;

        setTicketDetails({
          startTime: new Date(step2Data.start_time).toISOString().substring(0, 16),
          endTime: new Date(step2Data.end_time).toISOString().substring(0, 16),
          startBooking: new Date(step2Data.start_booking).toISOString().substring(0, 16),
          endBooking: new Date(step2Data.end_booking).toISOString().substring(0, 16),
          ticketTypes: step2Data.createTickets.map(ticket => ({
            id: ticket.id,
            typeName: ticket.type_name,
            price: ticket.price,
            quantity: ticket.available
          })),
        });

        setStep(2);
      }
    } catch (error) {
      console.error('Error fetching step 2 details:', error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (step === 1) {
      setEventDetails({ ...eventDetails, [name]: value });
    } else {
      setTicketDetails({ ...ticketDetails, [name]: value });
    }
  };

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value, 10);
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
    newTicketTypes[index] = { ...newTicketTypes[index], [name]: value };

    setTicketDetails({ ...ticketDetails, ticketTypes: newTicketTypes });

    if (!editedTicketIndices.includes(index)) {
      setEditedTicketIndices([...editedTicketIndices, index]);
    }
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

    if (id) {
      axios.post(`http://localhost:8080/merchant/update/first-step/${id}`, step1Data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Cookie: `JSESSIONID=${sessionId}` // Gửi cookie JSESSIONID cho API cập nhật bước 1
        },
        withCredentials: true,
      })
        .then(response => {
          if (response.data.code === 1000) {
            fetchStep2Details(id); // Gọi API lấy thông tin bước 2 sau khi hoàn thành bước 1
          }
        })
        .catch(error => {
          console.error('Error updating event (Step 1):', error.response ? error.response.data : error.message);
        });
    } else {
      axios.post('http://localhost:8080/merchant/add-event', step1Data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
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
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const file = e.target.eventBanner.files[0];
    const formData = new FormData();
    formData.append('eventBanner', file);

    try {
      const response = await axios.post('http://localhost:8080/merchant/eventImg', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Cookie: `JSESSIONID=${sessionId}`,
        },
        withCredentials: true,
      });

      if (response.data.code === 1000) {
        setEventDetails(prevState => ({ ...prevState, eventBanner: response.data.result }));
        toast.success('Image uploaded successfully');
        setStep(3); // Chuyển đến bước tiếp theo sau khi tải ảnh thành công
      }
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message);
      toast.error('Image upload failed');
    }
  };

  const handleAddEventStep2 = async (e) => {
    e.preventDefault();
    const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      return date.toISOString().replace('T', ' ').substring(0, 19);
    };

    const editedTickets = editedTicketIndices.map(index => ticketDetails.ticketTypes[index]);

    const step2Data = {
      start_time: formatDateTime(ticketDetails.startTime),
      end_time: formatDateTime(ticketDetails.endTime),
      start_booking: formatDateTime(ticketDetails.startBooking),
      end_booking: formatDateTime(ticketDetails.endBooking),
      ticketTypeRequests: editedTickets, // Chỉ gửi những ticket đã được chỉnh sửa
    };

    const url = id
      ? `http://localhost:8080/merchant/update/second-step/${id}`
      : 'http://localhost:8080/merchant/add-event-ticket';

    axios.post(url, step2Data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Cookie: `JSESSIONID=${sessionId}` // Gửi cookie JSESSIONID cho API cập nhật bước 2
      },
      withCredentials: true, // Đảm bảo rằng cookie được gửi kèm
    })
      .then(response => {
        if (response.data.code === 1000) {
          toast.success(`Event ${id ? 'updated' : 'added'} successfully. Please wait for approval.`);
          navigate(`/manage-event`);
        }
      })
      .catch(error => {
        console.error(`Error ${id ? 'updating' : 'creating'} event (Step 2):`, error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="add-event-container">
      <h2>{id ? 'Edit Event' : 'Create New Event'}</h2>
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
                  checked={eventDetails.categories.includes(category.id)}
                  onChange={handleCategoryChange}
                />
                <label>{category.category_name}</label>
              </div>
            ))}
          </div>
          <button type="submit">Next</button>
        </form>
      )}
      {step === 2 && !id && (
        <form onSubmit={handleUploadImage}>
          <div>
            <label>Event Banner</label>
            <input type="file" name="eventBanner" accept="image/*" required />
          </div>
          <button type="submit">Upload Image</button>
        </form>
      )}
      {step === 3 && !id && (
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
              <input
                type="text"
                name="typeName"
                placeholder="Type Name"
                value={ticket.typeName}
                onChange={(e) => handleTicketTypeChange(index, e)} 
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={ticket.price}
                onChange={(e) => handleTicketTypeChange(index, e)} 
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ticket.quantity}
                onChange={(e) => handleTicketTypeChange(index, e)} 
                required
              />
            </div>
          ))}
          <button type="submit">Create Event</button>
        </form>
      )}
      {step === 2 && id && (
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
              <input
                type="text"
                name="typeName"
                placeholder="Type Name"
                value={ticket.typeName}
                onChange={(e) => handleTicketTypeChange(index, e)} 
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={ticket.price}
                onChange={(e) => handleTicketTypeChange(index, e)} 
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ticket.quantity}
                onChange={(e) => handleTicketTypeChange(index, e)} 
                required
              />
            </div>
          ))}
          <button type="submit">Update Event</button>
        </form>
      )}
    </div>
  );
};

export default AddEditEvent;
