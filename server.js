const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv');


const app = express()

dotenv.config();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
    // user: 'root',
    // host: '127.0.0.1',
    // password: 'lawrence254#####',
    // database: 'hospital_db',
    // port: '3306'

    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306

})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL database as ID ' + connection.threadId);
})




// 1. Retrieve all patients

app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving patients');
        }
        res.json(results);
    });
});

// 2. Retrieve all providers


app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving providers');
        }
        res.json(results);
    });
});

// 3. Filter patients by First Name

app.get('/patients/firstname/:firstName', (req, res) => {
    const firstName = req.params.firstName;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    connection.query(query, [firstName], (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving patients by first name');
        }
        res.json(results);
    });
});


// 4.Retrieve all providers by their specialty

app.get('/providers/specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    connection.query(query, [specialty], (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving providers by specialty');
        }
        res.json(results);
    });
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})