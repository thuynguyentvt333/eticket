import React from 'react';
import './Popup.scss';
const Popup = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          ×
        </span>
        <h2>Thông tin chi tiết</h2>
        <table>
          <tbody>
            {/* Trường chung cho User và Merchant */}
            <tr>
              <th>ID:</th>
              <td>{data.id || data.mid || data.uid}</td>
            </tr>
            <tr>
              <th>Name:</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>{data.address}</td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>{data.phone}</td>
            </tr>

            {/* Trường riêng cho Merchant */}
            {data.license && (
              <tr>
                <th>License:</th>
                <td>{data.license}</td>
              </tr>
            )}
            {data.description && (
              <tr>
                <th>Description:</th>
                <td>{data.description}</td>
              </tr>
            )}

            {/* Trường riêng cho User */}
            {data.age && (
              <tr>
                <th>Age:</th>
                <td>{data.age}</td>
              </tr>
            )}
            {data.point !== undefined && ( // Kiểm tra point có tồn tại
              <tr>
                <th>Point:</th>
                <td>{data.point}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Popup;