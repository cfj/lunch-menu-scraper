var scrape = require('./scraper');
var Promise = require('promise');

function scrapeSlagthuset() {
    return new Promise(function(resolve, reject) {
        var url = 'http://www.slagthus.se/';
        var menu = {};

        scrape(url, '.printable', function(week) {
            menu.mon = week[0].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.tue = week[1].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.wed = week[2].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.thu = week[3].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.fri = week[4].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();

            resolve(menu);
        });
    });
}

function scrapeMeck() {
    return new Promise(function(resolve, reject) {
        var url = 'http://meckok.se/lunch/';
        var menu = {};

        scrape(url, '#veckanslunch article', function(week) {
            menu.mon = week[0].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.tue = week[1].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.wed = week[2].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.thu = week[3].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.fri = week[4].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();

            resolve(menu);
        });
    });
}

function scrapeMiaMarias() {
    return new Promise(function(resolve, reject) {
        var url = 'http://www.miamarias.nu/';
        var menu = {};

        scrape(url, '.et-tabs-content', function(week) {
            menu.mon = week[0].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            menu.tue = week[1].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            menu.wed = week[2].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            menu.thu = week[3].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            menu.fri = week[4].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();

            menu.fri = menu.fri.split(' ');
            menu.fri = menu.fri.slice(0, menu.fri.indexOf('Prenumera')).join(' ');

            resolve(menu);
        });
    });
}

module.exports = {
    slagthuset: scrapeSlagthuset,
    meck: scrapeMeck,
    miamarias: scrapeMiaMarias
}