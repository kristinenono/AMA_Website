// import puppeteer

const puppeteer = require("puppeteer")

async function go(){
    // cause the browser to launch
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
    })
    const page = await browser.newPage();

    // visist the site to be tested

    await page.goto("https://amabadgers.web.app/")

    // public view of pages
    // view the whole home page
    // scrolling goes to footer submit button
    const footersubmit = await page.$("#submit_btn");
    await page.evaluate(el => {
        const scrollIntoViewSlowly = (footersubmit) => {
            const scrollStep = 10;
            const scrollInterval = 30;
            let intervalId = setInterval(() => {
                const rect = footersubmit.getBoundingClientRect();
                if (rect.top <= window.innerHeight) {
                    clearInterval(intervalId);
                } else {
                    window.scrollBy(0, scrollStep);
                }
            }, scrollInterval);
        };
        scrollIntoViewSlowly(el);
    }, footersubmit);



    // close the browser
    // browser.close()
}
// calll go
go();