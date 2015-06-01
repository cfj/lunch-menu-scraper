const express = require('express');
const Promise = require('promise');
const fs = require('fs');
const scrapers = require('./scrapers');
const app = express();
const outputName = '../menus.json';

app.get('/scrape', (req, res) => {
    let restaurants = {};
    let promises = [];

    promises.push(scrapers.slagthuset());
    promises.push(scrapers.meck());
    promises.push(scrapers.miamarias());

    Promise.all(promises)
        .then(response => {
            restaurants.slagthuset = response[0];
            restaurants.meck       = response[1];
            restaurants.miamarias  = response[2];

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