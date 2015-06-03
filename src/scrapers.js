import scrape from './scraper';
import Promise from 'promise';

function slagthuset() {
    return new Promise((resolve, reject) => {
        let url = 'http://www.slagthus.se/';
        let menu = [];

        scrape(url, '.printable', week => {
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
    return new Promise((resolve, reject) => {
        let url = 'http://meckok.se/lunch/';
        let menu = [];

        scrape(url, '#veckanslunch article', week => {
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
    return new Promise((resolve, reject) => {
        let url = 'http://www.miamarias.nu/';
        let menu = [];

        scrape(url, '.et-tabs-content', week => {
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
    return new Promise((resolve, reject) => {
        let url = 'http://valfarden.nu/?page_id=14';
        let menu = [];

        scrape(url, '.single_inside_content p', week => {
            menu[0] = week[0].slice(2).join(' ').trim();
            menu[1] = week[1].slice(2).join(' ').trim();
            menu[2] = week[2].slice(2).join(' ').trim();
            menu[3] = week[3].slice(2).join(' ').trim();
            menu[4] = week[4].slice(2).join(' ').trim();

            resolve(menu);
        });
    });
}

function glasklart() {
    return new Promise((resolve, reject) => {
        let url = 'http://glasklart.eu/lunch/';
        let menu = [];

        scrape(url, '#cardcatid-8', week => {
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
    slagthuset,
    meck,
    miamarias,
    valfarden,
    glasklart
}