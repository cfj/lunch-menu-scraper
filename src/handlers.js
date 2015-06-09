import Promise from 'bluebird';
import fs from 'fs';
import aws from 'aws-sdk';
import scrapers from './scrapers';

aws.config.region = process.env.REGION || aws.config.region;

const outputName = 'menus.json';
const s3 = Promise.promisifyAll(new aws.S3());
const fsp = Promise.promisifyAll(fs);

function rootHandler (req, res) {
    let result = {};
    let promises;
    let params = { Bucket: process.env.S3_BUCKET, Key: outputName };

    result.restaurants = {};
    result.updated = new Date();

    promises = Object.getOwnPropertyNames(scrapers).map(name => scrapers[name]());

    Promise.all(promises)
        .then(response => {
            response.forEach(restaurant => {
                result.restaurants[restaurant.name] = restaurant;
            });

            params.Body = JSON.stringify(result);

            return s3.putObjectAsync(params);
        })
        .then(() => {
            if (fs.existsSync(outputName)) {
                fs.unlinkSync(outputName);
            }

            res.send("Scraped and saved to S3.");
        })
        .catch(console.log.bind(console));
}

function apiHandler (req, res) {
    let params = { Bucket: process.env.S3_BUCKET, Key: outputName, ResponseContentType : 'application/json' };
    let output;

    fsp.readFileAsync(outputName, 'utf8')
        .then(data => {
            res.json(JSON.parse(data));
        })
        .catch(err => {
            s3.getObjectAsync(params)
                .then(data => {
                    output = data.Body.toString();
                    return fsp.writeFileAsync(outputName, output);
                })
                .then((data) => {
                    res.json(JSON.parse(output));
                })
                .catch(console.log.bind(console));
        });
}

module.exports = {
    rootHandler,
    apiHandler
}