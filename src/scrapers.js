import config from './config';
import scrape from './scraper';
import Promise from 'promise';
import capitalize from 'capitalize';

function slagthuset() {
    return new Promise((resolve, reject) => {
        let url = config.slagthuset.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.slagthuset.mapUrl;
        restaurant.name = config.slagthuset.name;

        scrape(url, config.slagthuset.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '')
                                            .replace('veckans långkok', '<strong>Veckans långkok:</strong> ')
                                            .replace('dagens rätt', '<br><strong>Dagens rätt:</strong> ')
                                            .replace('dagens vegetariska', '<br><strong>Dagens vegetariska:</strong> ')
                                            .trim();
            }

            resolve(restaurant);
        });
    });
}

function storavarvsgatan() {
    return new Promise((resolve, reject) => {
        let url = config.storavarvsgatan.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.storavarvsgatan.mapUrl;
        restaurant.name = config.storavarvsgatan.name;

        scrape(url, config.storavarvsgatan.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(2).join(' ').replace(/\n+/g, '. ').replace(/\t+/g, '')
                                            .replace('dagens:', '')
                                            .replace('vegetarisk: ', '<br><strong>Vegetariskt: </strong>')
                                            .replace('vegetariskt: ', '<br><strong>Vegetariskt: </strong>')
                                            .replace('(', '<br>(')
                                            .trim();
                restaurant.menu[i] = capitalize(restaurant.menu[i]);
            }

            resolve(restaurant);
        });
    });
}

function miamarias() {
    return new Promise((resolve, reject) => {
        let url = config.miamarias.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.miamarias.mapUrl;
        restaurant.name = config.miamarias.name;

        scrape(url, config.miamarias.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\n+/g, '').replace(/\t+/g, '').replace(/\d+/g, '').replace('/', '').replace(/:-/g, ' ').replace(/kr /g, '')
                                            .replace('fisk', '<strong>Fisk:</strong> ')
                                            .replace('kött', '<br><strong>Kött:</strong> ')
                                            .replace('vegetarisk', '<br><strong>Vegetarisk:</strong> ')
                                            .replace('    ', ' ')
                                            .trim();
            }

            restaurant.menu[4] = restaurant.menu[4].split(' ');
            restaurant.menu[4] = restaurant.menu[4].slice(0, restaurant.menu[4].indexOf('prenumera')).join(' ');

            resolve(restaurant);
        });
    });
}

function valfarden() {
    return new Promise((resolve, reject) => {
        let url = config.valfarden.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.valfarden.mapUrl;
        restaurant.name = config.valfarden.name;

        scrape(url, config.valfarden.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').trim();
                restaurant.menu[i] = capitalize(restaurant.menu[i]);
            }

            let vegetariskIndex = restaurant.menu[4].indexOf('fredagslyx');
            restaurant.menu[4] = restaurant.menu[4].substr(0, vegetariskIndex);

            resolve(restaurant);
        });
    });
}

function kolga() {
    return new Promise((resolve, reject) => {
        let url = config.kolga.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.kolga.mapUrl;
        restaurant.name = config.kolga.name;

        scrape(url, config.kolga.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(3).join(' ').replace(/\s\d{2}:-/g, '. ')
                                            .replace('.', '.<br>')
                                            .trim();
                restaurant.menu[i] = capitalize(restaurant.menu[i]);
            }

            restaurant.menu[4] = restaurant.menu[4].substring(0, restaurant.menu[4].indexOf('gäller'));

            resolve(restaurant);
        });
    });
}

function akvariet() {
    return new Promise((resolve, reject) => {
        let url = config.akvariet.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.akvariet.mapUrl;
        restaurant.name = config.akvariet.name;

        scrape(url, config.akvariet.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(3).join(' ').trim();
                restaurant.menu[i] = capitalize(restaurant.menu[i]);
            }

            resolve(restaurant);
        });
    });
}

function glasklart() {
    return new Promise((resolve, reject) => {
        let url = config.glasklart.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.glasklart.mapUrl;
        restaurant.name = config.glasklart.name;

        scrape(url, config.glasklart.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').trim();
                restaurant.menu[i] = capitalize(restaurant.menu[i]);
            }

            resolve(restaurant);
        });
    });
}

function saltimporten() {
    return new Promise((resolve, reject) => {
        let url = config.saltimporten.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.saltimporten.mapUrl;
        restaurant.name = config.saltimporten.name;

        scrape(url, config.saltimporten.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ').replace(/\d+\/\d+/g, '').trim();
                restaurant.menu[i] = capitalize.words(restaurant.menu[i]);
            }

            let vegetariskIndex = restaurant.menu[4].indexOf('vegetariskt');
            restaurant.menu[4] = restaurant.menu[4].substr(0, vegetariskIndex);

            resolve(restaurant);
        });
    });
}

function restaurangP2() {
    return new Promise((resolve, reject) => {
        let url = config.restaurangP2.url;
        let restaurant = {};

        restaurant.menu = [];
        restaurant.url = url;
        restaurant.mapUrl = config.restaurangP2.mapUrl;
        restaurant.name = config.restaurangP2.name;

        scrape(url, config.restaurangP2.scraperSelector, week => {
            for(let i = 0; i < 5; i++) {
                restaurant.menu[i] = week[i].slice(1).join(' ')
                                                    .replace('local', '<strong>Local:</strong> ')
                                                    .replace('worldwide', '<br><strong>Worldwide:</strong> ')
                                                    .replace('world wide', '<br><strong>Worldwide:</strong> ')
                                                    .replace('chefs corner', '<br><strong>Chefs corner:</strong> ')
                                                    .replace(/\d+ kr/g, '')
                                                     .trim();
            }

            resolve(restaurant);
        });
    });
}

module.exports = {
    slagthuset,
    storavarvsgatan,
    miamarias,
    valfarden,
    kolga,
    akvariet,
    glasklart,
    saltimporten,
    restaurangP2
}