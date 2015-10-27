import scrape from './scraper';
import Promise from 'promise';

function slagthuset() {
    return new Promise((resolve, reject) => {
        let url = 'http://www.slagthus.se/';
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'Slagthuset';

        scrape(url, '.menu-hide .col-lg-6.menu-box', week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').trim();
            }

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
        restaurant.name = 'M.E.C.K';

        scrape(url, '#veckanslunch article', week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(2).join(' ').replace('Dagens: ', '').replace('Vegetarisk: ', '').replace(/\n+/g, '. ').replace(/\t+/g, '').trim();
            }

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
        restaurant.name = 'MiaMarias';

        scrape(url, '.et-tabs-content', week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/:-/g, ' ').trim();
            }

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
        restaurant.name = 'Välfärden';

        scrape(url, '.single_inside_content p', week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(2).join(' ').trim();
            }

            resolve(restaurant);
        });
    });
}

function kolga() {
    return new Promise((resolve, reject) => {
        let url = "https://gastrogate.com/restaurang/kolga/page/3/";
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.name = 'Kolga';

        scrape(url, '.table.lunch_menu', week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(3).join(' ').replace(/\s\d{2}:-/g, '. ').trim();
            }

            restaurant.menu[4] = restaurant.menu[4].substring(0, restaurant.menu[4].indexOf('gäller'));

            resolve(restaurant);
        });
    });
}

module.exports = {
    slagthuset,
    meck,
    miamarias,
    valfarden,
    kolga
}