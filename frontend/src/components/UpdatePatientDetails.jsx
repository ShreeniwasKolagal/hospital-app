import React, { useState } from 'react';
import './UpdatePatientDetails.css';

const API_BASE = import.meta.env.VITE_DB_URL;

const UpdatePatientDetails = () => {
    const [name, setName] = useState('');
    const [healthData, setHealthData] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch(`${API_BASE}/updatepatient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, healthData }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setError(data.error || data.message);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="update-patient-container">
            <h2 className="title">Update Patient Details</h2>
            <form onSubmit={handleSubmit} className="update-patient-form">
                <label>
                    <strong>Patient Name:</strong>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                    />
                </label>
                <label>
                    <strong>Health Data:</strong>
                    <textarea
                        value={healthData}
                        onChange={(e) => setHealthData(e.target.value)}
                        required
                        rows="4"
                        className="textarea-field"
                    ></textarea>
                </label>
                <button type="submit" className="submit-button">
                    Update Details
                </button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UpdatePatientDetails;
