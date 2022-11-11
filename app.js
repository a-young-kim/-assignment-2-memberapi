import express from 'express';
//import jwt from "jsonwebtoken";
//import dotenv from "dotenv";

// get page 
import indexRouter from './routes/index.js';
import signUpRouter from './routes/signup.js';
import homeRouter from './routes/home.js';

// main server
const app = express();
app.set('port', process.env.PORT || 3000);

// pulic static
app.use(express.static('public/stylesheets'));

// post erased
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/home', homeRouter);

// error
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '빈 포트에서 대기 중');
});