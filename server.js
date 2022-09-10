const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'mysqlRoot',
        database: 'clients'
    },
    console.log('Connected to the clients database.')
);

//API ROUTES FOR CUSTOMERS

// get all customers
app.get('/api/customers', (req, res) => {
    const sql = `SELECT * FROM customers
                LEFT JOIN machine
                ON customers.machine_id = machine.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// get one single customer 
app.get('/api/customers/:id', (req, res) => {
    const sql = `SELECT * FROM customers WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        })
    })
})

// DELETE A CUSTOMER
app.delete('/api/customers/:id', (req, res) => {
    const sql = `DELETE FROM customers WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message })
        } else if (!result.affectedRows) {
            res.json({
                message: 'Customer not found'
            })
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            })
        }
    })
})

// Create a candidate
app.post('/api/customers', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'first_name',
        'last_name'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO customers (first_name, last_name)
      VALUES (?,?)`;
    const params = [body.first_name, body.last_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// update candidate's machine! 
app.put('/api/customers/:id', (req, res) => {
    const errors = inputCheck(req.body, 'machine_id');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `UPDATE customers SET machine_id = ? 
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // check if a record was found
        } else if (!result.affectedRows) {
            res.json({
                message: 'Customer not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});


// API ROUTES FOR MACHINES

// get all machines
app.get('/api/machine', (req, res) => {
    const sql = `SELECT * from machine`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})

// get one machine 
app.get('/api/machine/:id', (req, res) => {
    const sql = `SELECT * FROM machine WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


// delete machine 
app.delete('/api/machine/:id', (req, res) => {
    const sql = `DELETE FROM machine WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Machine not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});