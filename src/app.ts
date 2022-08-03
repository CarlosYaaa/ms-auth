import express from 'express';
import morgan from 'morgan';

import Routes from './routes/index.routes';
const app = express();
import './database';

const context = process.env.CONTEXT || '';

if (app.get('env') === 'production') app.use(morgan('combined'));
else app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.disable('x-powered-by');

app.use(`${context}/usuario`, Routes.usuarioRoutes);

export default app;