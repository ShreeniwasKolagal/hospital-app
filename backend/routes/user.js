const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const SECRET_KEY = "your_secret_key";


// User sign-up
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
        return res.status(400).send('All fields are required');
    }

    // Ensure role is valid
    const validRoles = ['doctor', 'nurse', 'patient'];
    if (!validRoles.includes(role)) {
        return res.status(400).send('Invalid role. Allowed roles: doctor, nurse, patient');
    }

    try {
        // Check if the user already exists
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(checkUserQuery, [email], async (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length > 0) return res.status(400).send('User already exists');

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the database
            const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
            db.query(insertQuery, [name, email, hashedPassword, role], (err) => {
                if (err) return res.status(500).send(err);
                res.status(201).send('User registered successfully');
            });
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// User login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, role: user.role, id:user.id });
    });
});

// API to view all patients
router.get('/patients', (req, res) => {
    const query = `SELECT p.id, p.name, p.age, p.health_data, u.name AS doctor_name 
                   FROM patients p 
                   JOIN users u ON p.doctor_id = u.id`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving patients');
        }
        res.json(results);
    });
});

// Add a new patient
router.post('/patients', (req, res) => {
    const { doctorId, name, age, healthData } = req.body;

    if (!doctorId || !name || !age) {
        return res.status(400).json({ error: 'Doctor ID, name, and age are required' });
    }

    const query = `
        INSERT INTO patients (doctor_id, name, age, health_data)
        VALUES (?, ?, ?, ?)
    `;
    const values = [doctorId, name, age, healthData];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error adding patient:', err.message);
            return res.status(500).json({ error: 'An error occurred while adding the patient' });
        }

        res.status(201).json({ message: 'Patient added successfully', patientId: result.insertId });
    });
});

// API to add an appointment for a patient
router.post('/appointments', (req, res) => {
    const { patient_id, appointment_date, description } = req.body;

    if (!patient_id || !appointment_date || !description) {
        return res.status(400).send('Patient ID, appointment date, and description are required');
    }

    const query = `INSERT INTO appointments (patient_id, appointment_date, description) VALUES (?, ?, ?)`;
    db.query(query, [patient_id, appointment_date, description], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error adding appointment');
        }
        res.status(201).send('Appointment added successfully');
    });
});

// API to get all appointments for a patient
router.post('/get-appointments/', (req, res) => {
    const { patient_id } = req.body;

    const query = `SELECT a.id, a.appointment_date, a.description
                   FROM appointments a 
                   WHERE a.patient_id = ?`;

    db.query(query, [patient_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving appointments');
        }
        res.json(results);
    });
});

// Route to update patient health data
router.post('/updatepatient', (req, res) => {
    const { name, healthData } = req.body;

    if (!name || !healthData) {
        return res.status(400).json({ error: 'Name and health data are required.' });
    }

    const query = `
        UPDATE patients 
        SET health_data = ? 
        WHERE name = ?;
    `;

    db.query(query, [healthData, name], (err, result) => {
        if (err) {
            console.error('Error updating health data:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.status(200).json({ message: 'Health data updated successfully.' });
    });
});

module.exports = router;




