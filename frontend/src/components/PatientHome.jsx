import React, {useEffect, useState} from 'react';
import './PatientHome.css'

const API_BASE = import.meta.env.VITE_DB_URL;

const PatientHome = () => {
    const [appointments, setAppointments] = useState([]);

    // Fetch appointments for the patient
    useEffect(() => {
        fetch(`${API_BASE}/get-appointments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patient_id: localStorage.getItem('id') }),
            }
            )
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => console.error('Error fetching appointments:', error));
    }, [4]);

    return (
        <div className="patient-home">
            <h1>Your Appointments</h1>
            <div className="appointments-container">
                {appointments.map(appointment => (
                    <div className="appointment-card" key={appointment.id}>
                        <h2>Appointment on: {new Date(appointment.appointment_date).toLocaleString()}</h2>
                        <p><strong>Description:</strong> {appointment.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientHome;