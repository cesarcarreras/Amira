require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require('./helpers/passport');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error('Error connecting to mongo', err));

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTENDPOINT, process.env.BACKENDPOINT, "https://amirasoap.herokuapp.com", 'https://api.mailersend.com/v1']
  })
);


app.use(passport.initialize()); //<- First Initialize, then session
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));


const mpRoutes = require('./routes/mp');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const indexRoutes = require('./routes/index');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');

app.use('/api', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/mercadopago', mpRoutes);
app.use('/api/products', productRoutes);

// Uncomment this line for production
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app;
