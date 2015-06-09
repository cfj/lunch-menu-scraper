import Promise from 'promise';
import fs from 'fs';
import aws from 'aws-sdk';
import scrapers from './scrapers';

const outputName = 'menus.json';

function rootHandler (req, res) {
    let result = {};
    let promises;
    let s3 = new aws.S3();
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

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (fs.existsSync(outputName)) {
                        fs.unlinkSync(outputName);
                    }
                    res.send("Scraped and saved to S3.");
                }
           });
        })
        .catch(err => {
            console.log(err);
        });
}

function apiHandler (req, res) {
    let s3 = new aws.S3();
    let params = { Bucket: process.env.S3_BUCKET, Key: outputName, ResponseContentType : 'application/json' };

    fs.readFile(outputName, 'utf8', (err, data) => {
        if (err) {
            s3.getObject(params, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    fs.writeFile(outputName, data.Body.toString(), err => {
                        if(err) {
                            console.log(err); 
                        } else {
                            res.json(JSON.parse(data.Body.toString()));
                        }
                    });
                }
            });
        } else {
            res.json(JSON.parse(data));
        }
    });
}

module.exports = {
    rootHandler,
    apiHandler
}