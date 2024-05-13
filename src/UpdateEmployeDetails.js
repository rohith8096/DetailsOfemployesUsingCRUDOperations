import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployeDetails() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [dateofbirth, setDateofBirth] = useState('')
    const { id } = useParams(); // Note the () after useParams

    const navigate = useNavigate();


    function handlesubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, { name, email, phonenumber, dateofbirth })
            .then(res => {
                console.log(res);
                navigate('/');

            }).catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handlesubmit}>
                    <h2>Update Employee Details</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control'
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">PhoneNumber</label>
                        <input type="PhoneNumber" placeholder='Enter PhoneNumber' className='form-control'
                            onChange={e => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Date of Birth</label>
                        <input type="DateofBirth"  placeholder='Enter Date of Birth[YY-MM-DD]' className='form-control'
                            onChange={e => setDateofBirth(e.target.value)} />
                    </div>

                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateEmployeDetails  