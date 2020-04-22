const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/shareroute.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {

	
  test("We want to share a route", ({ given, when, then}) => {

    given("The page of List Routes", async() => {
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
            await page.$eval('[name=username]', el => el.value = 'viadees5b3');
            await page.waitFor('input[name=password]');
            await page.$eval('[name=password]', el => el.value = 'viade_es5b');
            await page.click('#login');
            await expect(page).toMatchElement("h1", { text: "¡Bienvenido a Viade!" , timeout: 3000});
            
            await page.click('[href="#/ver-rutas"]');
    });

    when("We share a route", async () => {
        let popup;
        await expect(page).toMatchElement("h1", { text: "Mis rutas" , timeout: 3000});
        //Pulsamos el botón Compartir:
        await page.waitFor(10000);
        await page.click('[data-testid=rb-compartir]');
        await page.waitFor(10000);
        await page.click('[data-testid=itemLista]');
        await page.click('[data-testid=compartirButton]');
       
    });

    then("We check that the route has been shared", async () => {
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
      await page.waitFor(10000);
      //Click en Compartido conmigo
      await page.click('[href="#/shared"]');
      await page.waitFor(10000);
      //Comprobamos que está la ruta que hemos compartido
      await expect(page).toMatchElement("h4", { text: "Ruta 1" , timeout: 3000});
      await expect(page).toMatchElement("p", { text: "Autor: viadees5b3" , timeout: 3000});
    });

  }); 

});