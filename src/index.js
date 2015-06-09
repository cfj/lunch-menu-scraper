import express from 'express';
import Promise from 'promise';
import fs from 'fs';
import scrapers from './scrapers';
import cors from 'cors';
import aws from 'aws-sdk';
import handlers from './handlers';

const app = express();

app.use(cors());

app.get('/', handlers.rootHandler);

app.get('/api/menus', handlers.apiHandler);

exports = module.exports = app;