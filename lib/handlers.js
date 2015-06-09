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

function rootHandler(req, res) {
    var result = {};
    var promises = undefined;
    var s3 = new _awsSdk2['default'].S3();
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

        s3.putObject(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                if (_fs2['default'].existsSync(outputName)) {
                    _fs2['default'].unlinkSync(outputName);
                }
                res.send('Scraped and saved to S3.');
            }
        });
    })['catch'](function (err) {
        console.log(err);
    });
}

function apiHandler(req, res) {
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
}

module.exports = {
    rootHandler: rootHandler,
    apiHandler: apiHandler
};