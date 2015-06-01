'use strict';

var express = require('express');
var Promise = require('promise');
var fs = require('fs');
var scrapers = require('./scrapers');
var app = express();
var outputName = '../menus.json';

app.get('/scrape', function (req, res) {
    var restaurants = {};
    var promises = [];

    promises.push(scrapers.slagthuset());
    promises.push(scrapers.meck());
    promises.push(scrapers.miamarias());

    Promise.all(promises).then(function (response) {
        restaurants.slagthuset = response[0];
        restaurants.meck = response[1];
        restaurants.miamarias = response[2];

        fs.writeFile(outputName, JSON.stringify(restaurants), function (err) {
            if (err) {
                console.log(err);
            }

            res.send('done');
        });
    })['catch'](function (err) {
        console.log(err);
    });
});

app.get('/api/menus', function (req, res) {
    fs.readFile(outputName, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }

        res.json(JSON.parse(data));
    });
});

app.listen(8081);

console.log('Running');

exports = module.exports = app;