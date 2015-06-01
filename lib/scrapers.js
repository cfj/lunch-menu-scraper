'use strict';

var scrape = require('./scraper');
var Promise = require('promise');

function slagthuset() {
    return new Promise(function (resolve, reject) {
        var url = 'http://www.slagthus.se/';
        var menu = [];

        scrape(url, '.printable', function (week) {
            menu[0] = week[0].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu[1] = week[1].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu[2] = week[2].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu[3] = week[3].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            menu[4] = week[4].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();

            resolve(menu);
        });
    });
}

function meck() {
    return new Promise(function (resolve, reject) {
        var url = 'http://meckok.se/lunch/';
        var menu = [];

        scrape(url, '#veckanslunch article', function (week) {
            menu[0] = week[0].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            menu[1] = week[1].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            menu[2] = week[2].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            menu[3] = week[3].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            menu[4] = week[4].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();

            resolve(menu);
        });
    });
}

function miamarias() {
    return new Promise(function (resolve, reject) {
        var url = 'http://www.miamarias.nu/';
        var menu = [];

        scrape(url, '.et-tabs-content', function (week) {
            menu[0] = week[0].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            menu[1] = week[1].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            menu[2] = week[2].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            menu[3] = week[3].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            menu[4] = week[4].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();

            menu[4] = menu[4].split(' ');
            menu[4] = menu[4].slice(0, menu[4].indexOf('Prenumera')).join(' ');

            resolve(menu);
        });
    });
}

function valfarden() {
    return new Promise(function (resolve, reject) {
        var url = 'http://valfarden.nu/?page_id=14';
        var menu = [];

        scrape(url, '.single_inside_content p', function (week) {
            menu[0] = week[0].slice(2).join(' ').trim();
            menu[1] = week[1].slice(2).join(' ').trim();
            menu[2] = week[2].slice(2).join(' ').trim();
            menu[3] = week[3].slice(2).join(' ').trim();
            menu[4] = week[4].slice(2).join(' ').trim();

            resolve(menu);
        });
    });
}

module.exports = {
    slagthuset: slagthuset,
    meck: meck,
    miamarias: miamarias,
    valfarden: valfarden
};