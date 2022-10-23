require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const verifyToken = require('./middleware/verifyToken');

const port = process.env.PORT || 8080;

// const genricUrl = '/api/v1';

//connect DB
connectDB();

//built in middleware to handle json data
app.use(express.json());

//built in middleware to handle url encoded form data
app.use(express.urlencoded({ extended: false }));

//auth
app.use('/api/v1', require('./routes/register'));
app.use('/api/v1', require('./routes/login'));

//users
app.use(verifyToken);
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/products', require('./routes/product'));
app.use('/api/v1/cart', require('./routes/cart'));

mongoose.connection.once('open', () => {
  console.log('connected to  mongoose');
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});

// email;
// ('dada@d.com');
// password;
// ('dada');

// {"email":"emagwu@gmailq.com",
// "password":"1239"
// }
