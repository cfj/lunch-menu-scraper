import express from 'express';
import Promise from 'promise';
import fs from 'fs';
import scrapers from './scrapers';
import cors from 'cors';
import aws from 'aws-sdk';

const app = express();
const outputName = 'menus.json';

aws.config.region = process.env.REGION || aws.config.region;

app.use(cors());

app.get('/', (req, res) => {
    let result = {};
    let promises = [];
    let s3 = new aws.S3();
    let params = { Bucket: process.env.S3_BUCKET, Key: outputName };

    result.restaurants = {};
    result.updated = new Date();

    promises.push(scrapers.slagthuset());
    promises.push(scrapers.meck());
    promises.push(scrapers.miamarias());
    promises.push(scrapers.valfarden());
    promises.push(scrapers.glasklart());

    Promise.all(promises)
        .then(response => {
            result.restaurants['Slagthuset'] = response[0];
            result.restaurants['M.E.C.K']    = response[1];
            result.restaurants['MiaMarias']  = response[2];
            result.restaurants['Välfärden']  = response[3];
            result.restaurants['Glasklart']  = response[4];

            params.Body = JSON.stringify(result);

            s3.putObject(params, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("Scraped and saved to S3.");
                }
           });

        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/api/menus', (req, res) => {
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
});

exports = module.exports = app;