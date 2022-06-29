const express = require("express");
const app = express();
app.use(express.json());
const userRoute = require("./routes/userRoute");
const transactionRoute = require('./routes/transactionRoute');
app.use('/api/users/', userRoute);
app.use('/api/transactions/', transactionRoute);
const port = 5000;
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOURL)
.then(() => {
    console.log('接続中');
}).catch((err) => {
    console.log(err);
})

app.get('/', (req, res) => res.send('Hello, World!'));
app.listen(port, () => console.log(`Node JS Server started at ${port}!`));
