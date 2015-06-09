'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _scrapers = require('./scrapers');

var _scrapers2 = _interopRequireDefault(_scrapers);

var outputName = 'menus.json';

var s3 = new _awsSdk2['default'].S3();

var read = _promise2['default'].denodeify(_fs2['default'].readFile);
var write = _promise2['default'].denodeify(_fs2['default'].writeFile);
var s3Get = _promise2['default'].denodeify(s3.getObject);
var s3Put = _promise2['default'].denodeify(s3.putObject);

function rootHandler(req, res) {
    var result = {};
    var promises = undefined;
    var params = { Bucket: process.env.S3_BUCKET, Key: outputName };

    result.restaurants = {};
    result.updated = new Date();

    promises = Object.getOwnPropertyNames(_scrapers2['default']).map(function (name) {
        return _scrapers2['default'][name]();
    });

    _promise2['default'].all(promises).then(function (response) {
        response.forEach(function (restaurant) {
            result.restaurants[restaurant.name] = restaurant;
        });

        params.Body = JSON.stringify(result);

        return s3Put(params);
    }).then(function () {
        if (_fs2['default'].existsSync(outputName)) {
            _fs2['default'].unlinkSync(outputName);
        }

        res.send('Scraped and saved to S3.');
    })['catch'](function (err) {
        console.log(err);
    });
}

function apiHandler(req, res) {
    var params = { Bucket: process.env.S3_BUCKET, Key: outputName, ResponseContentType: 'application/json' };

    read(outputName, 'utf8').then(function (data) {
        res.json(JSON.parse(data));
    })['catch'](function (err) {
        s3Get(params).then(function (data) {
            return write(outputName, data.Body.toString());
        }).then(function (data) {
            res.json(JSON.parse(data));
        })['catch'](console.log.bind(console));
    });
}

module.exports = {
    rootHandler: rootHandler,
    apiHandler: apiHandler
};