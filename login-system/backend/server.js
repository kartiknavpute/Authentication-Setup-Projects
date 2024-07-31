const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
// const User = require('./models/user');
// Load Environment Variables
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
// MongoDB connection
const dbURI = 'mongodb://localhost:27017/login_system';
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));



//app.use('/api/products', require('./routes/products'));
//app.use('/api/auth', require('./routes/auth'));
// User schema
//const userSchema = new mongoose.Schema({
//    username: { type: String, required: true, unique: true },
 //   email: { type: String, required: true, unique: true },
//    password: { type: String, required: true }
//});

// const User = mongoose.model('User', userSchema);
// imports routes
const User = require('../backend/models/user');
const products = require('./routes/products');
const auth = require('./routes/auth');
const orders = require('./routes/orders');


// use routes
app.use('/api/products', products);
app.use('/api/auth', auth);
app.use('/api/orders', orders);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Register endpoint
app.post('/api/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        res.status(200).send('Login successful');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
