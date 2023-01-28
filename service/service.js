require('dotenv').config();
const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 11 Pro Max'];
const JSZip = require('jszip');
const fs = require('fs');
const client = require('https');

function downloadLmage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', () => {console.log('qwe')})
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                console.log(1);

            }
        }).on('error', () => {console.log(1)}).on('timeout', () => {console.log(1)}).once('close', () => {console.log(13123)})
    });
}
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}
const zip = new JSZip();
const serviceModel = require('../modules/logs');
async function downloadImage(imgs) {
    imgs.map(src => {
        downloadLmage(src, `imgs/${Math.floor(Math.random(11111,99999) * 100000)}.jpg`)
            .then(console.log)
            .catch(console.error);
        downloadLmage(src, `imgs/${Math.floor(Math.random(11111,99999) * 100000)}.png`)
            .then(console.log)
            .catch(console.error);
        downloadLmage(src, `imgs/${Math.floor(Math.random(11111,99999) * 100000)}.webp`)
            .then(console.log)
            .catch(console.error);
    })


}


class Service {

    async addLog(user, req, res, next){
        try {
            serviceModel.addLog(user['login']);
        } catch (e){
            console.log(e);
            next(e);
        }
    }

    async getLog(user, req, res, next){
        try {
            let logs = await serviceModel.getLog();
            return res.json({answer: logs});
        } catch (e){
            next(e);
        }
    }

    async saveImg(user, req, res, next){
        try {
            const {link} = req.body;
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            await page.emulate(iPhone);
            await page.goto(link);
            const resultsSelector = '.j-color';
            await page.waitForSelector(resultsSelector, {visible: true});
            const loginUsername = await page.evaluate(resultsSelector => {
                return [...document.querySelectorAll('img')].map(anchor => {
                    return anchor.src;
                });
            }, resultsSelector);
            await downloadImage(loginUsername);

            await delay(3000);
            await fs.readdir('imgs', async (err, files) => {
                for(let file of files){
                    console.log(file);
                    const imageData = fs.readFileSync(`imgs/${file}`);
                    zip.file(file, imageData);
                    await delay(200);
                    fs.unlinkSync(`imgs/${file}`);
                }
                let fnct = fs.createWriteStream(`${process.env.ZIP_PATH}/sample.zip`);
                zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
                    .pipe(fnct)
                    .on('finish', async function () {
                        fnct.end();
                        await browser.close();
                        return  res.json({arr: ''});
                    });


            });


        } catch (e){
            console.log(e);
            return res.end();
        }
    }
}

module.exports = new Service();