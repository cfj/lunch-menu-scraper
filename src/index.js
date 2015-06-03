import express from 'express';
import Promise from 'promise';
import fs from 'fs';
import scrapers from './scrapers';
import cors from 'cors';

const app = express();
const outputName = '../menus.json';

app.use(cors());

app.get('/scrape', (req, res) => {
    let restaurants = {};
    let promises = [];

    promises.push(scrapers.slagthuset());
    promises.push(scrapers.meck());
    promises.push(scrapers.miamarias());
    promises.push(scrapers.valfarden());
    promises.push(scrapers.glasklart());

    Promise.all(promises)
        .then(response => {
            restaurants['Slagthuset'] = response[0];
            restaurants['M.E.C.K']    = response[1];
            restaurants['MiaMarias']  = response[2];
            restaurants['Välfärden']  = response[3];
            restaurants['Glasklart']  = response[4];

            fs.writeFile(outputName, JSON.stringify(restaurants), err => {
                if(err) {
                    console.log(err); 
                }

                res.send('done');
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/api/menus', (req, res) => {
    fs.readFile(outputName, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }

        res.json(JSON.parse(data));
    });
});

app.listen(8081);

console.log('Running');

exports = module.exports = app;