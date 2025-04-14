import React, {useEffect, useState} from 'react';

const API_BASE = import.meta.env.VITE_DB_URL;


const NurseHome = () => {
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
            <h1>Nurse's Dashboard</h1>
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
        </div>
    );
};

export default NurseHome;