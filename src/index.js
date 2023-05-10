const express = require('express');
const bodyParser = require('body-parser');
const agareRoutes = require('../Routes/agare');
const bilRoutes = require('../Routes/bilar');

const app = express();
app.use(bodyParser.json());

// Landing page
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});

// Använd agareRoutes för alla ägare-rutter
app.use('/agare', agareRoutes);

// Använd bilRoutes för alla bil-rutter
app.use('/bilar', bilRoutes);

// Starta servern på port 3000
app.listen(3000, () => {
    console.log('Servern lyssnar på port 3000');
});
