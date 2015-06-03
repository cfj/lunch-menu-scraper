'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _scrapers = require('./scrapers');

var _scrapers2 = _interopRequireDefault(_scrapers);

var app = (0, _express2['default'])();
var outputName = '../menus.json';

app.get('/scrape', function (req, res) {
    var restaurants = {};
    var promises = [];

    promises.push(_scrapers2['default'].slagthuset());
    promises.push(_scrapers2['default'].meck());
    promises.push(_scrapers2['default'].miamarias());
    promises.push(_scrapers2['default'].valfarden());
    promises.push(_scrapers2['default'].glasklart());

    _promise2['default'].all(promises).then(function (response) {
        restaurants.slagthuset = response[0];
        restaurants.meck = response[1];
        restaurants.miamarias = response[2];
        restaurants.valfarden = response[3];
        restaurants.glasklart = response[4];

        _fs2['default'].writeFile(outputName, JSON.stringify(restaurants), function (err) {
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
    _fs2['default'].readFile(outputName, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }

        res.json(JSON.parse(data));
    });
});

app.listen(8081);

console.log('Running');

exports = module.exports = app;