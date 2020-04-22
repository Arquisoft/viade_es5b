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
            await page.$eval('[name=username]', el => el.value = 'viadees5b');
            await page.waitFor('input[name=password]');
            await page.$eval('[name=password]', el => el.value = 'viade_es5b');
            await page.click('#login');
            await expect(page).toMatchElement("h1", { text: "¡Bienvenido a Viade!" , timeout: 3000});
            
            await page.click('[href="#/ver-rutas"]');
    });

    when("We share a route", async () => {
        await expect(page).toMatchElement("h1", { text: "Mis rutas" , timeout: 3000});
        //Pulsamos el botón Compartir:
        const [button] = await page.$x("//div[@class='elements']/button[contains(., 'Button text')]");
        const[div]=await page.$x("//div/h3[contains(.,'RutaParaCompartir')]")
    });

    then("We check that the route has been shared", async () => {
      
     
    });

  }); 

});