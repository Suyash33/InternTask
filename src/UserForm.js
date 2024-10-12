import './UserForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const UserForm = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);  // Convert FileList to array
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);  // Append new files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('handle', handle);

    // Append all selected files to FormData
    files.forEach(file => formData.append('images', file));

    try {
      await axios.post('https://interntask-521i.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Submission failed.');
    }
  };

  return (
  <>
    <NavBar></NavBar>
    <form onSubmit={handleSubmit}>
      <h2>User Submission Form</h2>

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Social Media Handle:</label>
      <input
        type="text"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        required
      />

      <label>Upload Images:</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />

      <div>
        {files.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  </>
  );
};

export default UserForm;
