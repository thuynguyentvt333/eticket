import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MenuLeftad from './MenuLeftad';
import PendingApprovalTable from './PendingApprovalTable';
import AllEventsTable from './AllEventsTable';
import './ShowEventAd.scss';
import { Pagination } from './Pagination';

const ShowEventAd = () => {
  const [selectedView, setSelectedView] = useState('pendingApproval');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(4); 
  useEffect(() => {
    const fetchData = async () => {
      let apiEndpoint = '';

      switch (selectedView) {
        case 'allEvents':
          apiEndpoint = 'http://localhost:8080/admin/event?size=30&categoriesId=7,8,9,10'; 
          break;
        case 'pendingApproval':
          apiEndpoint = 'http://localhost:8080/admin/event/pending';
          break;
        default:
          return;
      }

      try {
        const token = Cookies.get('token');
        const sessionId = Cookies.get('sessionId');

        const response = await axios.get(apiEndpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Session-Id': sessionId,
          },
        });

        setTableData(response.data.result); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedView]);

  const handleMenuSelect = (view) => {
    setSelectedView(view);
    setCurrentPage(1); 
  };
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = tableData.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Hàm xử lý khi trạng thái sự kiện được thay đổi
  const handleStatusChange = () => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const sessionId = Cookies.get('sessionId');
        const response = await axios.get('http://localhost:8080/admin/event/pending', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Session-Id': sessionId,
          },
        });
        setTableData(response.data.result); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  };

  return (
    <div className="app-container">
      <MenuLeftad onSelect={handleMenuSelect}
      selectedView={selectedView} />
      <div className="content">
        {selectedView === 'pendingApproval' && (
          <PendingApprovalTable data={tableData} onStatusChange={handleStatusChange} />
        )}
        {selectedView === 'allEvents' && (
          <>
            <AllEventsTable data={currentEvents} />
            <Pagination
              eventsPerPage={eventsPerPage}
              totalEvents={tableData.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ShowEventAd;