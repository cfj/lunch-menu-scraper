'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _scrapers = require('./scrapers');

var _scrapers2 = _interopRequireDefault(_scrapers);

_awsSdk2['default'].config.region = process.env.REGION || _awsSdk2['default'].config.region;

var outputName = 'menus.json';
var s3 = _bluebird2['default'].promisifyAll(new _awsSdk2['default'].S3());
var fs = _bluebird2['default'].promisifyAll(_fs3['default']);

function rootHandler(req, res) {
    var result = {};
    var promises = undefined;
    var params = { Bucket: process.env.S3_BUCKET, Key: outputName, ContentType: 'application/json', CacheControl: 'max-age=86400' };

    result.restaurants = {};
    result.updated = new Date();

    promises = Object.getOwnPropertyNames(_scrapers2['default']).map(function (name) {
        return _scrapers2['default'][name]();
    });

    _bluebird2['default'].all(promises).then(function (response) {
        response.forEach(function (restaurant) {
            result.restaurants[restaurant.name] = restaurant;
        });

        params.Body = JSON.stringify(result);

        return s3.putObjectAsync(params);
    }).then(function () {
        if (fs.existsSync(outputName)) {
            fs.unlinkSync(outputName);
        }

        res.send('Scraped and saved to S3.');
    })['catch'](console.log.bind(console));
}

function apiHandler(req, res) {
    var params = { Bucket: process.env.S3_BUCKET, Key: outputName, ResponseContentType: 'application/json' };
    var output = undefined;

    fs.readFileAsync(outputName, 'utf8').then(function (data) {
        res.json(JSON.parse(data));
    })['catch'](function (err) {
        s3.getObjectAsync(params).then(function (data) {
            output = data.Body.toString();
            return fs.writeFileAsync(outputName, output);
        }).then(function (data) {
            res.json(JSON.parse(output));
        })['catch'](console.log.bind(console));
    });
}

module.exports = {
    rootHandler: rootHandler,
    apiHandler: apiHandler
};