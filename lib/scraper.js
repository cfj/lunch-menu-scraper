'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var days = ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag'];

function scrape(url, selector, callback) {
    var content = '';
    var week = [[], [], [], [], []];

    (0, _request2['default'])(url, function (err, response, html) {
        if (!err) {
            (function () {
                var $ = _cheerio2['default'].load(html);

                $(selector).each(function (index, element) {
                    return content += ' ' + $(element).text();
                });

                content = content.split(/\s+/).map(function (e) {
                    return e.trim();
                });
                content = content.map(function (e) {
                    return e.toLowerCase();
                });

                for (var i = 0; i < days.length; i++) {
                    week[i] = content.slice(content.indexOf(days[i]), i !== days.length - 1 ? content.indexOf(days[i + 1]) : undefined);
                }

                callback(week);
            })();
        }
    });
}

module.exports = scrape;