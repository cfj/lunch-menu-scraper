import request from 'request';
import cheerio from 'cheerio';

const days = ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag'];

/**
 * @param  {string} url The url of the web page to scrape.
 * @param  {string} selector The css selector identifying the elements to scrape.
 * @param  {function} callback The function that gets passed the result of the scrape.
 */
function scrape(url, selector, callback) {
    let content = '';
    let week = [[], [], [], [], []];

    request(url, (err, response, html) => {
        if(!err) {
            let $ = cheerio.load(html);

            $(selector).each((index, element) => content += ' ' + $(element).text());

            content = content.replace(/\d+\/\d+/g, '');
            content = content.toLowerCase();
            let akvarietFix = content.indexOf('====');
            if(akvarietFix > -1) {
                content = content.substr(akvarietFix);
            }

            for(let i = 0; i < days.length; i++) {
                content = content.replace(days[i], ' ' + days[i]);
            }

            content = content.split(/\s+/);

            for(let i = 0; i < days.length; i++) {
                week[i] = content.slice(content.indexOf(days[i]), i !== days.length - 1 ? content.indexOf(days[i+1]) : undefined);
            }

            callback(week);
        }
    });
}

module.exports = scrape;