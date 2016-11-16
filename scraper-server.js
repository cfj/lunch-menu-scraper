var app = require('./lib');

app.listen(process.env.SCRAPER_PORT || 8080);
console.log('Running');