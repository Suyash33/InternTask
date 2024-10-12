import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';  
import './Admin.css';  

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://interntask-521i.onrender.com/api/users'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <NavBar />  
      <div className="dashboard-container">  
        <h2 className="dashboard-heading">Admin Dashboard</h2>  
        <div className="table-container">  
          <table className="table">  
            <thead>
              <tr>
                <th className="th">Name</th>  
                <th className="th">Handle</th>  
                <th className="th">Images</th> 
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="td">{user.name}</td>  
                  <td className="td">@{user.handle}</td> 
                  <td className="td">
                    <div className="image-container">
                      {user.images.map((image, index) => (
                        <img key={index} src={image} alt={`Uploaded by ${user.name}`} className="image" /> 
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
