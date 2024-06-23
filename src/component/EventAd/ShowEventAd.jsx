import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuLeftad from './MenuLeftad';
import PendingApprovalTable from './PendingApprovalTable';
import AllEventsTable from './AllEventsTable';
import './ShowEventAd.scss';

const ShowEventAd = () => {
  const [selected, setSelected] = useState('pendingApproval');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(selected);
  }, [selected]);

  const fetchData = async (selection) => {
    let url;
    if (selection === 'pendingApproval') {
      url = 'API_URL_FOR_PENDING_APPROVAL_EVENTS';
    } else if (selection === 'allEvents') {
      url = 'API_URL_FOR_ALL_EVENTS';
    }

    try {
      const response = await axios.get(url);
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelect = (selection) => {
    setSelected(selection);
  };

  return (
    <div className="app-container">
      <MenuLeftad onSelect={handleSelect} />
      <div className="content">
        <SearchBar />
        {selected === 'pendingApproval' && <PendingApprovalTable data={data} />}
        {selected === 'allEvents' && <AllEventsTable data={data} />}
      </div>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." className="search-input" />
      <button className="search-button">🔍</button>
    </div>
  );
};

export default ShowEventAd;
