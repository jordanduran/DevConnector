const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const app = express();

// Connect Database
// connectDB()

// Init Middleware
app.use(express.json({ extended: false }));
app.use(morgan('dev'))

app.get('/', (req,res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.use((error, req, res, next) => {
    let response = {};
    console.log(error);
    if(NODE_ENV === 'production'){
        response = {
            error: {
                message: `Server Error`
            }
        }
    }else{
        response = {error}
    }
    res.status(500).json(response);
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));