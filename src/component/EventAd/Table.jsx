import React, { useState, useEffect } from 'react';
import MenuLeftad from './MenuLeftad';
import './Tables.scss';

const App = () => {
  const [selectedView, setSelectedView] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let apiEndpoint = '';

      switch (selectedView) {
        case 'allEvents':
          apiEndpoint = 'http://localhost:8080/home/event';
          break;
        case 'pendingApproval':
          apiEndpoint = 'http://localhost:8080/admin/event/pending';
          break;
        default:
          return; // Don't fetch if no view is selected
      }

      try {
        const response = await fetch(apiEndpoint);
        const jsonData = await response.json();

        // Assuming API response structure is consistent:
        const dataToSet = selectedView === 'allEvents' ? jsonData.result.events : jsonData.data; 
        setTableData(dataToSet); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedView]);

  const handleMenuSelect = (view) => {
    setSelectedView(view);
  };

  const renderTableHeader = () => {
    switch (selectedView) {
      case 'allEvents':
        return (
          <tr>
            <th>Event Name</th>
            <th>Location</th>
            <th>Category</th> 
            <th>EventTime</th> 
          </tr>
        );
      case 'pendingApproval':
        return (
          <tr>
            <th>Event Name</th>
            <th>Location</th>
            <th>Time</th> 
            <th>Status</th> 
            <th>MerchantName</th> 
          </tr>
        );
      default:
        return null;
    }
  };

  const renderTableBody = () => {
    if (!tableData.length) return null; 

    return tableData.map((item, index) => {
      if (selectedView === 'allEvents') {
        return (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.location}</td>
            <td>{/* Replace with actual category data */}</td> 
            <td>{item.startDate}</td> 
          </tr>
        );
      } else if (selectedView === 'pendingApproval') {
        return (
          <tr key={index}>
            <td>{/* Replace with actual event name data */}</td> 
            <td>{/* Replace with actual location data */}</td> 
            <td>{/* Replace with actual time data */}</td> 
            <td>{/* Replace with actual status data */}</td> 
            <td>{/* Replace with actual merchant name data */}</td> 
          </tr>
        );
      } else {
        return null; 
      }
    });
  };

  return (
    <div>
      <MenuLeftad onSelect={handleMenuSelect} />
      {selectedView && ( 
        <table className="custom-table">
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      )}
    </div>
  );
};

export default App;