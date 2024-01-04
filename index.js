const express = require('express');
const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ShamiSQL'
});

// Connect MySQL
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected');
});

const app = express();

// Create Database
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE ShamiSQL";
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('Database created');
    });
});

// Create Table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('Employee table created');
    });
});

// Insert employee
app.get('/employee1', (req, res) => {
    let post = { name: 'Jake Smith', designation: 'Chief Executive officer' };
    let sql = 'INSERT INTO employee SET ?';
    let query = db.query(sql, post, (err) => {
        if (err) {
            throw err;
        }
        res.send('Employee added');
    });
});

// Select the employees
app.get('/getemployee1', (req, res) => {
    let sql = 'SELECT * FROM employee'; // Corrected the SQL query
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send('Employee details fetched');
    });
});

// update employee
app.get('/updateemployee/:id', (req, res) => {
    // Assuming newName is coming from somewhere (request, database, etc.)
    let newName = 'John Doe';  // Replace with the actual value or source of the new name

    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
    
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('Employee updated');
    });
});

//delete employee
app.get('/deletemployee/:id', (req,res) => {
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if(err){
            throw err;
        }
        res.send('Employee deleted');
    });
});

//delete database
app.get('/deletedb', (req, res) => {
    let sql = 'DROP DATABASE ShamiSQL';
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('Database deleted');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});