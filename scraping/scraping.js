const puppeteer = require("puppeteer");

async function go() {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });
  const page = await browser.newPage();

  await page.goto("https://amabadgers.web.app/");
  //   MEMBER LOG IN

  await page.click("body > header > nav > div.navbar-brand > a");

  await page.waitForSelector("#burgerloginbtn");

  await page.click("#burgerloginbtn");

  await page.waitForSelector("#email");

  await page.type("#email", "test@test.com");

  await page.type("#password", "testtest");

  await page.click("#submit");

  await page.waitForSelector("#title_uw");

  await page.click("body > header > nav > div.navbar-brand > a");

  await page.waitForSelector("#members-link");

  await page.click("#members-link");

  await page.waitForSelector("#pointbtn1");

  await page.click("#pointbtn1");

  await page.waitForSelector(
    "#main-content > div.columns.is-centered.mt-4.mb-4 > div > div > header > p"
  );

  await page.screenshot({ path: "test_points.png", fullPage: true });

  await page.click("body > header > nav > div.navbar-brand > a");
  await page.waitForSelector("#burgeroutbtn");
  await page.click("#burgeroutbtn");

  //   EXEC LOG IN

  await page.waitForSelector("#title_uw");

  await page.click("body > header > nav > div.navbar-brand > a");

  await page.waitForSelector("#burgerloginbtn");

  await page.click("#burgerloginbtn");

  await page.waitForSelector("#email");

  await page.type("#email", "amauwmadison@gmail.com");

  await page.type("#password", "IS2024!");

  await page.click("#submit");

  await page.waitForSelector("#title_uw");

  await page.click("body > header > nav > div.navbar-brand > a");

  await page.waitForSelector("#members-link");

  await page.click("#members-link");

  await page.waitForSelector("#pointbtn1");

  await page.click("#pointbtn1");
  await page.waitForSelector("#applyFilters");

  await page.screenshot({ path: "exec_points.png", fullPage: true });

  // Close the browser
  await browser.close();
}

// Call the go function
go();
