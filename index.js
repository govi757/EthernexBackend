const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors'); 
const dbConfig = require('./config/database.config');
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',resave: false,saveUninitialized: true}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.static(path.join(__dirname, '/customer/dist/Wezen')))
app.use(express.static(path.join(__dirname, '/admin/dist/WezenAdmin')))
const postRoutes = require('./app/routes/planning.postRoutes');
const getRoutes = require('./app/routes/planning.getRoutes');
app.use(express.static('public'));

// error handler middleware
// app.use((error, req, res, next) => {
//     res.status(error.status || 500).send({
//         error: {
//             status: error.status || 500,
//             message: error.message || 'Internal Server Error',
//         },
//     });
// });
app.use(express.json());
app.use(express.urlencoded())

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Error", err);
});

postRoutes(app);
getRoutes(app);

// app.get('/', (req, res) => {
//     res.json({ "message": "Welcome to Planningtool" });
// });

app.get('/ethernex/*', (req, res) => {
    return(res.sendFile(path.join(__dirname, '/customer/dist/Wezen/index.html')))
})
app.get('/admin/*', (req, res) => {
    return(res.sendFile(path.join(__dirname, '/admin/dist/WezenAdmin/index.html')))
})

// listen for requests
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});