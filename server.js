const express = require('express');
const db = require('./SQL/db/connection')
const apiRoutes = require('./routes/apiRoutes');

const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const PORT = process.env.PORT || 3001;
const app = express();


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/apiRoutes'));
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});



// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});