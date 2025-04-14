const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
