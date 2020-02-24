const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Init middleware
app.use(express.json({extended: false}));

// Connect Database
connectDB();
app.get('/', (req, res) => {
    res.send('API Running');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile')); 
app.use('/api/posts', require('./routes/api/posts'));

app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.