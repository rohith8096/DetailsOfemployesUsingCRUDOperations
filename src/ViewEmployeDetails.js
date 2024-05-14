import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewEmployeeDetails() {
  const [employee, setViewEmployeeDetails] = useState(null); // State to hold employee details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams(); // Get the employee ID from the route params

  useEffect(() => {
    // Fetch employee data from the backend API based on the provided employee ID
    axios.get(`http://localhost:8081/view/${id}`)
      .then(res => {
        setViewEmployeeDetails(res.data); // Set the employee data in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        setError(err.message); // Set error message if there's an error
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [id]); // Include id in the dependency array to re-fetch data when id changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an error
  }

  if (!employee) {
    return <div>No employee details found.</div>; // Show message if no employee data is available
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone Number:</strong> {employee.phoneNumber}</p>
      <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ViewEmployeeDetails;

