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

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var app = (0, _express2['default'])();
var outputName = 'menus.json';

_awsSdk2['default'].config.region = process.env.REGION || _awsSdk2['default'].config.region;

app.use((0, _cors2['default'])());

app.get('/', function (req, res) {
    var result = {};
    var promises = [];
    var s3 = new _awsSdk2['default'].S3();
    var params = { Bucket: process.env.S3_BUCKET, Key: outputName };

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

        params.Body = JSON.stringify(result);

        s3.putObject(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send('Scraped and saved to S3.');
            }
        });
    })['catch'](function (err) {
        console.log(err);
    });
});

app.get('/api/menus', function (req, res) {
    var s3 = new _awsSdk2['default'].S3();
    var params = { Bucket: process.env.S3_BUCKET, Key: outputName, ResponseContentType: 'application/json' };

    _fs2['default'].readFile(outputName, 'utf8', function (err, data) {
        if (err) {
            s3.getObject(params, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    _fs2['default'].writeFile(outputName, data.Body.toString(), function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(JSON.parse(data.Body.toString()));
                        }
                    });
                }
            });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

exports = module.exports = app;