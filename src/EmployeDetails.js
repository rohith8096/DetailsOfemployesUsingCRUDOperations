import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeDetails() {
    const [employedetails, setEmployeDetails] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setEmployeDetails(res.data))
            .catch(err => console.log(err));
    }, []);


    const handleDelete = async (id) => { // Changed '=' to '=>'
        try {
            await axios.delete('http://localhost:8081/student/' + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };
    
  
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded'>
                <Link to="/create" className='btn btn-success'>Create+</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>PhoneNumber</th>
                            <th>DateofBirth</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employedetails.map((data, i) => (
                            <tr key={i}>
                                <td>{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>{data.PhoneNumber}</td>
                                <td>{data.DateofBirth}</td>
                                <td>
                                    <Link to={`update/${data.ID}`}className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-primary ms-2' onClick={e => handleDelete(data.ID)}>Delete</button>
                                    <Link to={`view/${data.ID}`} className='btn btn-primary ms-2'>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeDetails;
