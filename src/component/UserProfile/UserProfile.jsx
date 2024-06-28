import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import './UserProfile.scss';

const UserProfile = () => {
  const role = useSelector((state) => state.user.role);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = Cookies.get('token');
        let apiEndpoint = '';
        if (role === 'USER') {
          apiEndpoint = 'http://localhost:8080/user/profile';
        } else if (role === 'MERCHANT USER') {
          apiEndpoint = 'http://localhost:8080/merchant/profile';
        } else {
          throw new Error('Invalid user role');
        }

        const response = await axios.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data.result);
        setEditedProfile(response.data.result); // Khởi tạo editedProfile
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [role]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const token = Cookies.get('token');
      let apiEndpoint = '';
      let data = {};

      if (role === 'USER') {
        apiEndpoint = 'http://localhost:8080/user/update';
        data = {
          name: editedProfile.name,
          address: editedProfile.address,
          phone: editedProfile.phone,
          age: editedProfile.age,
        };
      } else if (role === 'MERCHANT USER') {
        apiEndpoint = 'http://localhost:8080/merchant/profile/update';
        data = {
          name: editedProfile.name,
          address: editedProfile.address,
          description: editedProfile.description,
          phone: editedProfile.phone,
        };
      }

      const response = await axios.post(apiEndpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cập nhật profileData sau khi chỉnh sửa thành công
      setProfileData(editedProfile);
      setIsEditing(false);
      alert("Cập nhật thành công");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="user-profile">
       
      <h2>Hồ Sơ Của Bạn</h2>
     
      {isEditing && (
        <div className="edit-popup">
          <div className="popup-content">
            <h3>Chỉnh sửa thông tin</h3>
            {role === 'USER' && (
              <div className="user">
                <div className='form-group'>
                  <label htmlFor='name'><strong>Tên:</strong></label>
                  <input type="text" id='name' name="name" value={editedProfile.name || ''} onChange={handleInputChange} className='form-control' />
                </div>
                <div className='form-group'>
                  <label htmlFor='address'><strong>Địa chỉ:</strong></label>
                  <input type="text" id='address' name="address" value={editedProfile.address || ''} onChange={handleInputChange} className='form-control' />
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'><strong>Số điện thoại:</strong></label>
                  <input type="text" id='phone' name="phone" value={editedProfile.phone || ''} onChange={handleInputChange} className='form-control' />
                </div>
                <div className='form-group'>
                  <label htmlFor='age'><strong>Tuổi:</strong></label>
                  <input type="number" id='age' name="age" value={editedProfile.age || ''} onChange={handleInputChange} className='form-control' />
                </div>
                <p><strong>Điểm tích lũy:</strong> {profileData.point}</p>
                {/* Điểm tích lũy không cho sửa nên để profileData.point */}
              </div>
            )}
            {role === 'MERCHANT USER' && (
              <div className="user">
                <div className='form-group'>
                  <label htmlFor='name'><strong>Tên doanh nghiệp:</strong></label>
                  <input type="text" id='name' name="name" value={editedProfile.name || ''} onChange={handleInputChange} className='form-control' />
                </div>
                <div className='form-group'>
                  <label htmlFor='address'><strong>Địa chỉ:</strong></label>
                  <input type="text" id='address' name="address" value={editedProfile.address || ''} onChange={handleInputChange} className='form-control' />
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'><strong>Số điện thoại:</strong></label>
                  <input type="text" id='phone' name="phone" value={editedProfile.phone || ''} onChange={handleInputChange} className='form-control' />
                </div>
                <div className='form-group'>
                  <label htmlFor='description'><strong>Mô tả:</strong></label>
                  <input type="text" id='description' name="description" value={editedProfile.description || ''} onChange={handleInputChange} className='form-control' />
                </div>
                <p><strong>Giấy phép:</strong> {profileData.license}</p>
               
              </div>
            )}
            <button onClick={handleUpdateProfile} className="btn btn-success">
              Cập nhật
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary ms-2">
              Hủy
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        // Hiển thị thông tin profile khi không chỉnh sửa
        <div>
          {role === 'USER' && profileData && (
          <table className="table user"> 
          <tbody> 
            <tr>
              <td><strong>Tên:</strong></td>
              <td>{profileData.name || 'Chưa cập nhật'}</td>
            </tr>
            <tr>
              <td><strong>Địa chỉ:</strong></td>
              <td>{profileData.address || 'Chưa cập nhật'}</td>
            </tr>
            <tr>
              <td><strong>Số điện thoại:</strong></td>
              <td>{profileData.phone || 'Chưa cập nhật'}</td>
            </tr>
            <tr>
              <td><strong>Tuổi:</strong></td>
              <td>{profileData.age >= 0 ? profileData.age : 'Chưa cập nhật'}</td>
            </tr>
            <tr>
              <td><strong>Điểm tích lũy:</strong></td>
              <td>{profileData.point}</td>
            </tr>
          </tbody>
        </table>
          )}

          {role === 'MERCHANT USER' && profileData && (
             <table className="table user">
             <tbody>
               <tr>
                 <td><strong>Tên doanh nghiệp:</strong></td>
                 <td>{profileData.name}</td>
               </tr>
               <tr>
                 <td><strong>Địa chỉ:</strong></td>
                 <td>{profileData.address}</td>
               </tr>
               <tr>
                 <td><strong>Số điện thoại:</strong></td>
                 <td>{profileData.phone}</td>
               </tr>
               <tr>
                 <td><strong>Giấy phép:</strong></td>
                 <td>{profileData.license}</td>
               </tr>
               <tr>
                 <td><strong>Mô tả:</strong></td>
                 <td>{profileData.description}</td>
               </tr>
             </tbody>
           </table>
          )}
        </div>
          )}
            <button onClick={handleEditClick} className="btn btn-primary mb-3">
        Chỉnh sửa thông tin
      </button>
    </div>
  );
};

export default UserProfile;
