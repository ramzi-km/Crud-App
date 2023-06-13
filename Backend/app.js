const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./config/dbConnection');

const app = express();
const PORT = process.env.PORT || 8000;

const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');

//connect to database
connectDb();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: ['http://localhost:4200'], credentials: true }));

//listening
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

//route setup
app.use('/api', userRouter);
app.use('/api/admin', adminRouter);

module.exports = app;
