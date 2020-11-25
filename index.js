const express = require('express')
const os = require('os');
const app = express();
const port = 3000;
const https = require('https')

const hostname = os.hostname();

app.get('/', (request, res) => {
    https.get('https://api.ipify.org/', (resp) => {
        let ip = 'No encontro';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            ip = chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.send(`Saludos desde ${hostname} con IP: ${ip}!`);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });    
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))