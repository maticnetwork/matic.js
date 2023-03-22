const pupeteer = require('puppeteer');

async function execute() {


    const browser = await pupeteer.launch({
        headless: true,
        devtools: true
    });

    const page = await browser.newPage();


    await page.goto('https://proof-generator.polygon.technology/api/v1/matic/block-included/100000/');
    await page.waitForTimeout(5000);


    const result = await page.evaluate(async () => {
        // debugger;
        const result = await fetch("https://proof-generator.polygon.technology/api/v1/matic/block-included/100000/", {
            method: "GET",
            headers: {
                // ':authority': 'proof-generator.polygon.technology',
                // ':method': 'GET',
                // ':path': '/api/v1/matic/block-included/100000/',
                // ':scheme': 'https',
                // accept: '*/*',
                // 'accept-encoding': 'gzip, deflate, br',
                // 'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                // 'if-none-match': 'W/"107-fzAk8c8kZHsk9FrHicfd98/ooP0"',
                // 'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': "Linux",
                // 'sec-fetch-dest': 'empty',
                // 'sec-fetch-mode': 'cors',
                // 'sec-fetch-site': 'same-origin',
                // 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
                // "credentials": "include"


                'Content-Type': 'application/json' ,
                Accept: 'application/json' ,
                'User-Agent':  'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)' ,
                'Accept-Encoding':  'gzip,deflate' ,
                Connection:  'close' 
            },
            // mode: 'no-cors'
        }).then(data => {
            return data.text();
            console.log("data", data.status, data.headers);
            return data.json();
        }).catch(err => {
            // console.error("err", err, JSON.stringify(err), "stack", err.stack, 'status', err.status);
            return 'error' + err.message;
        })
        return result;
    });


    console.log("result", result);

    await page.waitForTimeout(20000);

}


execute().then(function () {
    process.exit(0);
}).catch(function (err) {
    console.error("err", err);
})
