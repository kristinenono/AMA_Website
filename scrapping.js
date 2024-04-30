const puppeteer = require("puppeteer");

async function go() {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });
  const page = await browser.newPage();

  // Visit the site to be tested
  await page.goto("https://amabadgers.web.app/");

  // Click on the burger menu button
  await page.click("body > header > nav > div.navbar-brand > a");

  // Wait for a short delay for the menu to open (adjust this delay if necessary)
  await page.waitForSelector("#burgerloginbtn");

  // Click on the button with the selector #burgerloginbtn
  await page.click("#burgerloginbtn");

  // Wait for the email input field to be visible
  await page.waitForSelector("#email");

  // Type "test@test.com" into the email input field
  await page.type("#email", "test@test.com");

  // Type "testtest" into the password input field
  await page.type("#password", "testtest");

  // Click on the submit button
  await page.click("#submit");

  // Close the browser
  await browser.close();
}

// Call the go function
go();
