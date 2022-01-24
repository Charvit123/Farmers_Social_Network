require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use('/api', require('./routes/authRouter'));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
}, err => {
    if(err)
        throw err;
    console.log('Connected to mongodb')
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running on port:', port);
})
