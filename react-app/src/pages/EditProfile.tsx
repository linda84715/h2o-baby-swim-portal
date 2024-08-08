// @ts-nocheck
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../config';


interface UserProfile {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  points: number;
}

const EditProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // 獲取會員資料
    axios.get(API.USERS.GET_USERINFO, { withCredentials: true,headers: {
      'ngrok-skip-browser-warning': 'true'}})
      .then(response => {
        setUserProfile(response.data);
        setUpdatedProfile(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the profile!', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedProfile) {
      setUpdatedProfile({ ...updatedProfile, [name]: value });
    }
  };

  const handleSave = () => {
    if (updatedProfile) {
      axios.put(API.USERS.UPDATE_PROFILE, updatedProfile, { withCredentials: true })
        .then(response => {
          setUserProfile(updatedProfile);
          setEditing(false);
        })
        .catch(error => {
          console.error('There was an error updating the profile!', error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>Error loading profile.</div>;
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      {editing ? (
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={updatedProfile?.firstname || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={updatedProfile?.lastname || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={updatedProfile?.email || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={updatedProfile?.phone || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={updatedProfile?.address || ''}
              onChange={handleInputChange}
            />
          </label>
          <p>Points: {userProfile.points}</p>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>First Name: {userProfile.firstname}</p>
          <p>Last Name: {userProfile.lastname}</p>
          <p>Email: {userProfile.email}</p>
          <p>Phone: {userProfile.phone}</p>
          <p>Address: {userProfile.address}</p>
          <p>Points: {userProfile.points}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
