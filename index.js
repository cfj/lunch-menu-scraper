var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('promise');
var fs = require('fs');
var app = express();

var days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

app.get('/', function(req, res) {
    res.send('Running');
});

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

function scrape(url, selector, callback) {
    var content = '';
    var week = [[], [], [], [], []];

    request(url, function(err, response, html) {
        if(!err) {
            var $ = cheerio.load(html);

            $(selector).each(function(index, element) {
                content += $(element).text();
            });

            content = content.split(' ').map(function(e) {
                return e.trim();
            });

            for(var i = 0; i < days.length; i++) {
                week[i] = content.slice(content.indexOf(days[i]), i !== days.length - 1 ? content.indexOf(days[i+1]) : undefined);
            }

            callback(week);
        }
    });   
}

app.get('/scrape', function(req, res) {
    var restaurants = {};
    var promises = [];

    promises.push(scrapeSlagthuset());
    promises.push(scrapeMeck());
    promises.push(scrapeMiaMarias());

    Promise.all(promises)
        .then(function(resp) {
            restaurants.slagthuset = resp[0];
            restaurants.meck       = resp[1];
            restaurants.miamarias  = resp[2];

            fs.writeFile('menus.json', JSON.stringify(restaurants), function(err) {
                if(err) {
                    console.log(err); 
                }

                res.send('done');
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.get('/api/menus', function(req, res) {
    fs.readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }

        res.json(JSON.parse(data));
    });
});

app.listen(8081);

console.log('Running');

exports = module.exports = app;