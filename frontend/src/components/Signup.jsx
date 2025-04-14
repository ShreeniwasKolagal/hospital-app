import React, {useState} from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom'; // For navigation

const API_BASE = import.meta.env.VITE_DB_URL;

const SignUp = () => {
    //form data
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        role:''
    });

    const [error, setError] = useState(''); // To handle errors
    const navigate = useNavigate(); // Navigation hook

    //handle text field changes logic
    const handleChanges = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    //handle submit button logic
    const handleSubmit = async (e)=>{
        //prevent default action
        e.preventDefault();
        console.log('Signup for data: ',formData);
        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error(errorData.error || 'Registration failed');
            }

            // On success, redirect to login page
            navigate('/login');
        } catch (error) {
            setError(error.message || 'An error occurred during registration');
        }
    }

    return (
        <div className='signup-container'>
            <h1>Welcome to Hospital Management Portal</h1>
            <p>A platform for doctors, nurses and patients to track their progress!</p>
            <hr/>
            <p>Fill out the form to sign up!</p>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChanges}
                        placeholder='Full Name'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChanges}
                        placeholder='Email'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChanges}
                        placeholder='Password'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='role'>Role</label>
                    <select id='role' name='role' value={formData.role} onChange={handleChanges} required>
                        <option value=''>Select your role</option>
                        <option value='doctor'>Doctor</option>
                        <option value='nurse'>Nurse</option>
                        <option value='patient'>Patient</option>
                    </select>
                </div>
                <button type='submit' className='signup-button'>Sign up</button>
            </form>
            <br/>
            <p>Don't have an account? <a href="/login">Login!</a></p>
        </div>
    );
};

export default SignUp;