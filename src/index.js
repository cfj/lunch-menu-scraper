import express from 'express';
import cors from 'cors';
import handlers from './handlers';
import fs from 'fs';

const app = express();

app.use(cors());

app.get('/', handlers.rootHandler);

app.get('/api/menus', handlers.apiHandler);

app.get('/api/menus/local', (req, res) => {
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }

        res.json(JSON.parse(data));
    });
});

exports = module.exports = app;