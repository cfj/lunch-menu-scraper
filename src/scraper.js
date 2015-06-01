const request = require('request');
const cheerio = require('cheerio');

const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

function scrape(url, selector, callback) {
    let content = '';
    let week = [[], [], [], [], []];

    request(url, (err, response, html) => {
        if(!err) {
            let $ = cheerio.load(html);

            $(selector).each((index, element) => content += $(element).text());

            content = content.split(' ').map(e => e.trim());

            for(let i = 0; i < days.length; i++) {
                week[i] = content.slice(content.indexOf(days[i]), i !== days.length - 1 ? content.indexOf(days[i+1]) : undefined);
            }

            callback(week);
        }
    });   
}

module.exports = scrape;