import scrape from './scraper';
import Promise from 'promise';

function slagthuset() {
    return new Promise((resolve, reject) => {
        let url = 'http://www.slagthus.se/';
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;

        scrape(url, '.printable', week => {
            restaurant.menu[0] = week[0].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            restaurant.menu[1] = week[1].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            restaurant.menu[2] = week[2].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            restaurant.menu[3] = week[3].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            restaurant.menu[4] = week[4].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();

            resolve(restaurant);
        });
    });
}

function meck() {
    return new Promise((resolve, reject) => {
        let url = 'http://meckok.se/lunch/';
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;

        scrape(url, '#veckanslunch article', week => {
            restaurant.menu[0] = week[0].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            restaurant.menu[1] = week[1].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            restaurant.menu[2] = week[2].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            restaurant.menu[3] = week[3].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            restaurant.menu[4] = week[4].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();

            resolve(restaurant);
        });
    });
}

function miamarias() {
    return new Promise((resolve, reject) => {
        let url = 'http://www.miamarias.nu/';
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;

        scrape(url, '.et-tabs-content', week => {
            restaurant.menu[0] = week[0].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            restaurant.menu[1] = week[1].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            restaurant.menu[2] = week[2].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            restaurant.menu[3] = week[3].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();
            restaurant.menu[4] = week[4].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/Fisk|Kött|Vegetarisk/g, '').replace(/:-/g, ' ').trim();

            restaurant.menu[4] = restaurant.menu[4].split(' ');
            restaurant.menu[4] = restaurant.menu[4].slice(0, restaurant.menu[4].indexOf('Prenumera')).join(' ');

            resolve(restaurant);
        });
    });
}

function valfarden() {
    return new Promise((resolve, reject) => {
        let url = 'http://valfarden.nu/?page_id=14';
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;

        scrape(url, '.single_inside_content p', week => {
            restaurant.menu[0] = week[0].slice(2).join(' ').trim();
            restaurant.menu[1] = week[1].slice(2).join(' ').trim();
            restaurant.menu[2] = week[2].slice(2).join(' ').trim();
            restaurant.menu[3] = week[3].slice(2).join(' ').trim();
            restaurant.menu[4] = week[4].slice(2).join(' ').trim();

            resolve(restaurant);
        });
    });
}

function glasklart() {
    return new Promise((resolve, reject) => {
        let url = 'http://glasklart.eu/lunch/';
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;

        scrape(url, '#cardcatid-12', week => {
            restaurant.menu[0] = week[0].slice(2).join(' ').trim();
            restaurant.menu[1] = week[1].slice(2).join(' ').trim();
            restaurant.menu[2] = week[2].slice(2).join(' ').trim();
            restaurant.menu[3] = week[3].slice(2).join(' ').trim();
            restaurant.menu[4] = week[4].slice(2).join(' ').trim();

            resolve(restaurant);
        });
    });
}

module.exports = {
    slagthuset,
    meck,
    miamarias,
    valfarden,
    glasklart
}