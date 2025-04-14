import React, {useEffect, useState} from 'react';
import './DoctorHome.css'
const API_BASE = import.meta.env.VITE_DB_URL;


const DoctorHome = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE}/api/patients`)
            .then(response => {
                if (!response.ok) {
                    console.error(response.json());
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching patients:', error));
    }, []);

    return (
        <div className="doctor-home">
            <h1>Doctor's Dashboard</h1>
            <br/>
            <a href="/update-patient-details">Update Patient's details</a>
            <br/>
            <br/>

            <div className="patients-container">
                {patients.map(patient => (
                    <div className="patient-card" key={patient.id}>
                        <h2>{patient.name}</h2>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Doctor:</strong> {patient.doctor_name}</p>
                        <p><strong>Health Data:</strong> {patient.health_data}</p>
                    </div>
                ))}
            </div>
            <br/>
            <a href="/add-patient">Add new patient</a>
            <br/>
        </div>
    );
};

export default DoctorHome;