const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/login.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {

	
  test("We want to login into Viade_es5b", ({ given, when, then}) => {
    

    given("The login page", async() => {
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
      });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/",{waitUntil: "load", timeout: 0}); 
    });

    when("We press Iniciar Sesion and enter our information", async () => {
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

    then("I expect to be on the Welcome page of ViaDe", async () => {
      
      await expect(page).toMatchElement("h1", { text: "¡Bienvenido a Viade!" , timeout: 3000});
      await expect(page).toMatchElement("h3", { text: "Hola viade5b, has iniciado sesión con este WebID:" , timeout: 3000});
    });

  }); 

});