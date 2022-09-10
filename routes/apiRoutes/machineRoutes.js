const express = require('express');
const router = express.Router();
const db = require('../../SQL/db/connection');

// API ROUTES FOR MACHINES

// get all machines
router.get('/machine', (req, res) => {
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
router.get('/machine/:id', (req, res) => {
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
router.delete('/machine/:id', (req, res) => {
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

module.exports = router;