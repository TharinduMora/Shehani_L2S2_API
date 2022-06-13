const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// const url = "mongodb+srv://admin2:admin111@cluster0.mzunw.mongodb.net/mytable?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017";

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

var db = mongoose.connection;
db.once("open", () => {
    console.log("MongoDB connection successfull.");
});

var driverRouter = require('./routes/driver.js');
app.use('/driver', driverRouter);
//pp.use A route will match any path that follows its path immediately with a “/”. 
var userRouter = require('./routes/user.js');
app.use('/user', userRouter);

var feedbackRouter = require('./routes/feedback.js');
app.use('/feedback', feedbackRouter);

var tripRouter = require('./routes/trip.js');
app.use('/trip', tripRouter);


app.listen(3001, () => {
    console.log("Server is running on 3001");
})