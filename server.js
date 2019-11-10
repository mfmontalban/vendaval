const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const account = require('./routes/api/account');
const application = require('./routes/api/application');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const email = require('./routes/api/email');
const staff = require('./routes/api/staff');
const seguridad = require('./routes/api/seguridad');
const vientos = require('./routes/api/vientos');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

// DB Config
const db = process.env.MONGODB_URI || require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use directory
app.use('/api/account', account);
app.use('/api/application', application);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/email', email);
app.use('/api/staff', staff);
app.use('/api/seguridad', seguridad);
app.use('/api/vientos', vientos);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  // Locate main html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
