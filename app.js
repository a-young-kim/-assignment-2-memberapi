import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import sessionParser from 'express-session';

// get page 
import indexRouter from './routes/index.js';
import signUpRouter from './routes/signup.js';
import homeRouter from './routes/home.js';
import customersRouter from './routes/api/customers.js';


// main server
const app = express();
app.set('port', process.env.PORT || 80);

// pulic static
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public/stylesheets")));
app.use(express.static(path.join(__dirname, "public/javascripts")));

// post erased
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser()); 

app.use(
    sessionParser({
        key: "loginData",
        secret: "test",
        resave: true,
        saveUninitialized: false,
        cookies:{
            expires: 60 * 60 *24
        },
    })
);

app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/home', homeRouter);
app.use('/api/customers', customersRouter);


app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '빈 포트에서 대기 중');
});

export default app;