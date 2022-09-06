const express = require('express');
const mysql = require('mysql2');

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

// // get all customers
// db.query(`SELECT * FROM customers`, (err, rows) => {
//     console.log(rows);
// })

// get one single customer 
// db.query(`SELECT * FROM customers WHERE id=1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

//delete a customer
// db.query(`DELETE FROM customers WHERE id =?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// })

// create a customer 
const sql = `INSERT INTO customers (id, first_name, Last_name)
values (?,?,?)`;
const params = [1, 'Marcio', 'Buffolo'];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
})

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });



// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});