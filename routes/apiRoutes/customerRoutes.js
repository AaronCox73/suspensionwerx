const express = require('express');
const router = express.Router();
const db = require('../../SQL/db/connection');
const inputCheck = require('../../utils/inputCheck')


//API ROUTES FOR CUSTOMERS

// get all customers
router.get('/customers', (req, res) => {
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
router.get('/customers/:id', (req, res) => {
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
router.delete('/customers/:id', (req, res) => {
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

// Create a customer
router.post('/customers', ({ body }, res) => {
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

// update customer's machine! 
router.put('/customers/:id', (req, res) => {
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


module.exports = router;