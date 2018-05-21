'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _scraper = require('./scraper');

var _scraper2 = _interopRequireDefault(_scraper);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function slagthuset() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].slagthuset.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].slagthuset.mapUrl;
        restaurant.name = _config2['default'].slagthuset.name;

        (0, _scraper2['default'])(url, _config2['default'].slagthuset.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace('veckans långkok', '<strong>Veckans långkok:</strong> ').replace('dagens rätt', '<br><strong>Dagens rätt:</strong> ').replace('dagens vegetariska', '<br><strong>Dagens vegetariska:</strong> ').trim();
            }

            resolve(restaurant);
        });
    });
}

function storavarvsgatan() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].storavarvsgatan.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].storavarvsgatan.mapUrl;
        restaurant.name = _config2['default'].storavarvsgatan.name;

        (0, _scraper2['default'])(url, _config2['default'].storavarvsgatan.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(2).join(' ').replace(/\n+/g, '. ').replace(/\t+/g, '').replace('dagens:', '').replace('vegetarisk: ', '<br><strong>Vegetariskt: </strong>').replace('vegetariskt: ', '<br><strong>Vegetariskt: </strong>').replace('(', '<br>(').trim();
                restaurant.menu[i] = (0, _capitalize2['default'])(restaurant.menu[i]);
            }

            resolve(restaurant);
        });
    });
}

function miamarias() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].miamarias.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].miamarias.mapUrl;
        restaurant.name = _config2['default'].miamarias.name;

        (0, _scraper2['default'])(url, _config2['default'].miamarias.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/:-/g, ' ').replace(/kr /g, '').replace('fisk', '<strong>Fisk:</strong> ').replace('kött', '<br><strong>Kött:</strong> ').replace('vegetarisk', '<br><strong>Vegetarisk:</strong> ').replace('    ', ' ').trim();
            }

            restaurant.menu[4] = restaurant.menu[4].split(' ');
            restaurant.menu[4] = restaurant.menu[4].slice(0, restaurant.menu[4].indexOf('prenumera')).join(' ');

            resolve(restaurant);
        });
    });
}

function valfarden() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].valfarden.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].valfarden.mapUrl;
        restaurant.name = _config2['default'].valfarden.name;

        (0, _scraper2['default'])(url, _config2['default'].valfarden.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').trim();
                restaurant.menu[i] = (0, _capitalize2['default'])(restaurant.menu[i]);
            }

            var vegetariskIndex = restaurant.menu[4].indexOf('fredagslyx');
            restaurant.menu[4] = restaurant.menu[4].substr(0, vegetariskIndex);

            resolve(restaurant);
        });
    });
}

function kolga() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].kolga.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].kolga.mapUrl;
        restaurant.name = _config2['default'].kolga.name;

        (0, _scraper2['default'])(url, _config2['default'].kolga.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(3).join(' ').replace(/\s\d{2}:-/g, '. ').replace('.', '.<br>').trim();
                restaurant.menu[i] = (0, _capitalize2['default'])(restaurant.menu[i]);
            }

            restaurant.menu[4] = restaurant.menu[4].substring(0, restaurant.menu[4].indexOf('gäller'));

            resolve(restaurant);
        });
    });
}

function akvariet() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].akvariet.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].akvariet.mapUrl;
        restaurant.name = _config2['default'].akvariet.name;

        (0, _scraper2['default'])(url, _config2['default'].akvariet.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(3).join(' ').trim();
                restaurant.menu[i] = (0, _capitalize2['default'])(restaurant.menu[i]);
            }

            resolve(restaurant);
        });
    });
}

function glasklart() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].glasklart.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].glasklart.mapUrl;
        restaurant.name = _config2['default'].glasklart.name;

        (0, _scraper2['default'])(url, _config2['default'].glasklart.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').trim();
                restaurant.menu[i] = (0, _capitalize2['default'])(restaurant.menu[i]);
            }

            resolve(restaurant);
        });
    });
}

function saltimporten() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].saltimporten.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].saltimporten.mapUrl;
        restaurant.name = _config2['default'].saltimporten.name;

        (0, _scraper2['default'])(url, _config2['default'].saltimporten.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\d+\/\d+/g, '').trim();
                restaurant.menu[i] = _capitalize2['default'].words(restaurant.menu[i]);
            }

            var vegetariskIndex = restaurant.menu[4].indexOf('vegetariskt');
            restaurant.menu[4] = restaurant.menu[4].substr(0, vegetariskIndex);

            resolve(restaurant);
        });
    });
}

function restaurangP2() {
    return new _promise2['default'](function (resolve, reject) {
        var url = _config2['default'].restaurangP2.url;
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = _config2['default'].restaurangP2.mapUrl;
        restaurant.name = _config2['default'].restaurangP2.name;

        (0, _scraper2['default'])(url, _config2['default'].restaurangP2.scraperSelector, function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace('local', '<strong>Local:</strong> ').replace('worldwide', '<br><strong>Worldwide:</strong> ').replace('world wide', '<br><strong>Worldwide:</strong> ').replace('chefs corner', '<br><strong>Chefs corner:</strong> ').replace(/\d+ kr/g, '').trim();
            }

            resolve(restaurant);
        });
    });
}

module.exports = {
    slagthuset: slagthuset,
    storavarvsgatan: storavarvsgatan,
    miamarias: miamarias,
    valfarden: valfarden,
    kolga: kolga,
    akvariet: akvariet,
    glasklart: glasklart,
    saltimporten: saltimporten,
    restaurangP2: restaurangP2
};