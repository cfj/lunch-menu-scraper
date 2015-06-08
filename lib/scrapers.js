'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scraper = require('./scraper');

var _scraper2 = _interopRequireDefault(_scraper);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function slagthuset() {
    return new _promise2['default'](function (resolve, reject) {
        var url = 'http://www.slagthus.se/';
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'Slagthuset';

        (0, _scraper2['default'])(url, '.printable', function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            }

            resolve(restaurant);
        });
    });
}

function meck() {
    return new _promise2['default'](function (resolve, reject) {
        var url = 'http://meckok.se/lunch/';
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'M.E.C.K';

        (0, _scraper2['default'])(url, '#veckanslunch article', function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            }

            resolve(restaurant);
        });
    });
}

function miamarias() {
    return new _promise2['default'](function (resolve, reject) {
        var url = 'http://www.miamarias.nu/';
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'MiaMarias';

        (0, _scraper2['default'])(url, '.et-tabs-content', function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            }

            restaurant.menu[4] = restaurant.menu[4].split(' ');
            restaurant.menu[4] = restaurant.menu[4].slice(0, restaurant.menu[4].indexOf('Prenumera')).join(' ');

            resolve(restaurant);
        });
    });
}

function valfarden() {
    return new _promise2['default'](function (resolve, reject) {
        var url = 'http://valfarden.nu/?page_id=14';
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'Välfärden';

        (0, _scraper2['default'])(url, '.single_inside_content p', function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(2).join(' ').trim();
            }

            resolve(restaurant);
        });
    });
}

function glasklart() {
    return new _promise2['default'](function (resolve, reject) {
        var url = 'http://glasklart.eu/lunch/';
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'Glasklart';

        (0, _scraper2['default'])(url, '#cardcatid-12', function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(2).join(' ').trim();
            }

            resolve(restaurant);
        });
    });
}

module.exports = {
    slagthuset: slagthuset,
    meck: meck,
    miamarias: miamarias,
    valfarden: valfarden,
    glasklart: glasklart
};