var express = require('express');
var request = require('request');
var Promise = require('promise');
var fs = require('fs');
var scrapers = require('./scrapers');
var app = express();

app.get('/scrape', function(req, res) {
    var restaurants = {};
    var promises = [];

    promises.push(scrapers.slagthuset());
    promises.push(scrapers.meck());
    promises.push(scrapers.miamarias());

    Promise.all(promises)
        .then(function(resp) {
            restaurants.slagthuset = resp[0];
            restaurants.meck       = resp[1];
            restaurants.miamarias  = resp[2];

            fs.writeFile('menus.json', JSON.stringify(restaurants), function(err) {
                if(err) {
                    console.log(err); 
                }

                res.send('done');
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get('/api/menus', function(req, res) {
    fs.readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }

        res.json(JSON.parse(data));
    });
});

app.listen(8081);

console.log('Running');

exports = module.exports = app;