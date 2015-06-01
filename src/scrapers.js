const scrape = require('./scraper');
const Promise = require('promise');

function slagthuset() {
    return new Promise((resolve, reject) => {
        let url = 'http://www.slagthus.se/';
        let menu = {};

        scrape(url, '.printable', week => {
            menu.mon = week[0].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.tue = week[1].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.wed = week[2].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.thu = week[3].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.fri = week[4].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();

            resolve(menu);
        });
    });
}

function meck() {
    return new Promise((resolve, reject) => {
        let url = 'http://meckok.se/lunch/';
        let menu = {};

        scrape(url, '#veckanslunch article', week => {
            menu.mon = week[0].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.tue = week[1].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.wed = week[2].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.thu = week[3].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu.fri = week[4].slice(2).join(' ').replace('Dagens: ', '').replace(/\n+/g, '').replace(/\t+/g, '').trim();

            resolve(menu);
        });
    });
}

function miamarias() {
    return new Promise((resolve, reject) => {
        let url = 'http://www.miamarias.nu/';
        let menu = {};

        scrape(url, '.et-tabs-content', week => {
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
    slagthuset,
    meck,
    miamarias
}