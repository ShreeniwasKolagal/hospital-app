import React, { useState } from 'react';
import './AddPatient.css'

const API_BASE = import.meta.env.VITE_DB_URL;

const AddPatient = () => {
    const [formData, setFormData] = useState({
        doctorId: '',
        name: '',
        age: '',
        healthData: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE}/api/patients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                window.alert(errorData.error || 'Failed to add patient');
                throw new Error(errorData.error || 'Failed to add patient');
            }

            setMessage('Patient added successfully!');
            setFormData({ doctorId: '', name: '', age: '', healthData: '' }); // Reset form
        } catch (error) {
            setMessage(error.message || 'Error occurred');
        }
    };

    return (
        <div className="add-patient-container">
            <h1>Add New Patient</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="doctorId">Doctor ID</label>
                    <input
                        type="number"
                        id="doctorId"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Patient Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="healthData">Health Data</label>
                    <textarea
                        id="healthData"
                        name="healthData"
                        value={formData.healthData}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Add Patient</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddPatient;
