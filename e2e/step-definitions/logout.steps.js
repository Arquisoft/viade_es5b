const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/logout.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {

	
  test("We want to log out of Viade_es5b", ({ given, when, then}) => {
    

    given("The login page", async() => {
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
      });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/",{waitUntil: "load", timeout: 0}); 
      await expect(page).toMatchElement("h1", { text: "¡Bienvenido a Viade!" , timeout: 3000});
      //Hacemos click en el Iniciar sesion:
      await page.click('[href="#/login"]');

      //Introducimos el webId y hacemos click en el botón Login:
      await page.type('input[name=idp]', 'https://viadees5b.solid.community/profile/card#me', {delay: 20})
      await page.click('[class="sc-EHOje dqQDCe"]');

      //Introducimos el nombre de usuario, la contraseña y hacemos click en el botón de Log In
      await page.waitFor('input[name=username]');
      await page.$eval('[name=username]', el => el.value = 'viadees5b');
      await page.waitFor('input[name=password]');
      await page.$eval('[name=password]', el => el.value = 'viade_es5b');
      await page.click('#login');
    });

    when("We press Log Out", async () => {
        await page.goto("http://localhost:3000/#/",{waitUntil: "load", timeout: 0});
    });

    then("I expect to be on the Welcome page of ViaDe", async () => {
      await expect(page).toMatchElement("h1", { text: "¡Bienvenido a Viade!" , timeout: 3000});
    });

  }); 

});