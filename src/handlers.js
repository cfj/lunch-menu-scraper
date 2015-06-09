import Promise from 'promise';
import fs from 'fs';
import aws from 'aws-sdk';
import scrapers from './scrapers';

const outputName = 'menus.json';

const s3 = new aws.S3();

const read  = Promise.denodeify(fs.readFile);
const write = Promise.denodeify(fs.writeFile);
const s3Get = Promise.denodeify(s3.getObject);
const s3Put = Promise.denodeify(s3.putObject);

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

            return s3Put(params);
        })
        .then(() => {
            if (fs.existsSync(outputName)) {
                fs.unlinkSync(outputName);
            }

            res.send("Scraped and saved to S3.");
        })
        .catch(err => {
            console.log(err);
        });
}

function apiHandler (req, res) {
    let params = { Bucket: process.env.S3_BUCKET, Key: outputName, ResponseContentType : 'application/json' };

    read(outputName, 'utf8')
        .then(data => {
            res.json(JSON.parse(data));
        })
        .catch(err => {
            s3Get(params)
                .then(data => {
                    return write(outputName, data.Body.toString());
                })
                .then((data) => {
                    res.json(JSON.parse(data));
                })
                .catch(console.log.bind(console));
        });
}

module.exports = {
    rootHandler,
    apiHandler
}