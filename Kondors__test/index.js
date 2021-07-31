require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbconnetion } = require('./config/dbconnection');
const app = express();
app.use( cors() );
// // middware for read and parse from body

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dbconnetion();

// Rotesnpm 
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
  console.log(
    'Listening Server of port: \x1b[32m%s\x1b[0m',
    process.env.PORT
  );
});
