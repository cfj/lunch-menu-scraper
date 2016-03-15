'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scraper = require('./scraper');

var _scraper2 = _interopRequireDefault(_scraper);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function slagthuset() {
    return new _promise2['default'](function (resolve, reject) {
        var url = 'http://www.slagthus.se/';
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'Slagthuset';

        (0, _scraper2['default'])(url, '.menu-hide .col-lg-6.menu-box', function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace('veckans långkok', '<strong>Veckans långkok:</strong> ').replace('dagens rätt', '<br><strong>Dagens rätt:</strong> ').replace('dagens vegetariska', '<br><strong>Dagens vegetariska:</strong> ').trim();
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
                restaurant.menu[i] = week[i].slice(2).join(' ').replace(/\n+/g, '. ').replace(/\t+/g, '').replace('dagens:', '').replace('vegetarisk: ', '<br><strong>Vegetariskt: </strong>').replace('vegetariskt: ', '<br><strong>Vegetariskt: </strong>').replace('(', '<br>(').trim();
                restaurant.menu[i] = (0, _capitalize2['default'])(restaurant.menu[i]);
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
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/:-/g, ' ').replace('fisk', '<strong>Fisk:</strong> ').replace('kött', '<br><strong>Kött:</strong> ').replace('vegetarisk', '<br><strong>Vegetarisk:</strong> ').replace('    ', ' ').trim();
            }

            restaurant.menu[4] = restaurant.menu[4].split(' ');
            restaurant.menu[4] = restaurant.menu[4].slice(0, restaurant.menu[4].indexOf('prenumera')).join(' ');

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
        var url = 'https://gastrogate.com/restaurang/kolga/page/3/';
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'Kolga';

        (0, _scraper2['default'])(url, '.table.lunch_menu', function (week) {
            for (var i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(3).join(' ').replace(/\s\d{2}:-/g, '. ').replace('.', '.<br>').trim();
                restaurant.menu[i] = (0, _capitalize2['default'])(restaurant.menu[i]);
            }

            restaurant.menu[4] = restaurant.menu[4].substring(0, restaurant.menu[4].indexOf('gäller'));

            resolve(restaurant);
        });
    });
}

function saltimporten() {
    return new _promise2['default'](function (resolve, reject) {
        var url = 'http://www.saltimporten.com/';
        var restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'Saltimporten';

        (0, _scraper2['default'])(url, 'ul.list-unstyled', function (week) {
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

module.exports = {
    slagthuset: slagthuset,
    meck: meck,
    miamarias: miamarias,
    valfarden: valfarden,
    kolga: kolga,
    saltimporten: saltimporten
};