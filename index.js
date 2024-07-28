const express = require("express");
const { chromium } = require("playwright");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/scrape", async (req, res) => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://developer.chrome.com/");
    await page.fill(".search-box__input", "automate beyond recorder");
    await page.click(".search-box__link");
    const fullTitle = await page.textContent("text=Customize and automate");
    res.send(`The title of this blog post is ${fullTitle}`);
  } catch (e) {
    res.status(500).send(`Error: ${e.message}`);
  } finally {
    await browser.close();
  }
});

app.get("/", (req, res) => {
  res.send("Playwright server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
