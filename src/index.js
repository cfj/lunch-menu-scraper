import express from 'express';
import cors from 'cors';
import handlers from './handlers';

const app = express();

app.use(cors());

app.get('/', handlers.rootHandler);

app.get('/api/menus', handlers.apiHandler);

exports = module.exports = app;