'use strict';

var request = require('request');
var cheerio = require('cheerio');

var days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

function scrape(url, selector, callback) {
    var content = '';
    var week = [[], [], [], [], []];

    request(url, function (err, response, html) {
        if (!err) {
            (function () {
                var $ = cheerio.load(html);

                $(selector).each(function (index, element) {
                    return content += $(element).text();
                });

                content = content.split(' ').map(function (e) {
                    return e.trim();
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