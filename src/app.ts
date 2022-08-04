import express from 'express';
import morgan from 'morgan';

import Routes from './routes/index.routes';
const app = express();
import './database';

const context = process.env.CONTEXT || '';

if (app.get('env') === 'production') app.use(morgan('combined'));
else app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    next();
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.disable('x-powered-by');

app.use(`${context}/usuario`, Routes.usuarioRoutes);

export default app;