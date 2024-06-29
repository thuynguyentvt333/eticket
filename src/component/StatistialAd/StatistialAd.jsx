import React, { useState } from 'react';
import './StatistialAd.scss';
function StatistialAd() {
  const [data] = useState([
    { STT: 1, merchantName: 'Nam', Address: 'Hà Nội', Phone: '0988677301' },
    { STT: 2, merchantName: 'Thúy', Address: 'Hà Nội', Phone: '0945292376' },
    { STT: 3, merchantName: 'Tuấn', Address: 'HCM', Phone: '0385799797' },
  ]);

  return (
    <div className="container">
      

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>merchantName</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.STT}>
              <td>{item.STT}</td>
              <td>{item.merchantName}</td>
              <td>{item.Address}</td>
              <td>{item.Phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatistialAd;