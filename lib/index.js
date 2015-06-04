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

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var app = (0, _express2['default'])();
var outputName = '../menus.json';

app.use((0, _cors2['default'])());

app.get('/scrape', function (req, res) {
    var restaurants = {};
    var result = {};
    var promises = [];

    result.restaurants = {};
    result.updated = new Date();

    promises.push(_scrapers2['default'].slagthuset());
    promises.push(_scrapers2['default'].meck());
    promises.push(_scrapers2['default'].miamarias());
    promises.push(_scrapers2['default'].valfarden());
    promises.push(_scrapers2['default'].glasklart());

    _promise2['default'].all(promises).then(function (response) {
        result.restaurants['Slagthuset'] = response[0];
        result.restaurants['M.E.C.K'] = response[1];
        result.restaurants['MiaMarias'] = response[2];
        result.restaurants['Välfärden'] = response[3];
        result.restaurants['Glasklart'] = response[4];

        _fs2['default'].writeFile(outputName, JSON.stringify(result), function (err) {
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