const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/publicarComentario.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {

	
  test("We want to post coment into route", ({ given, when, then}) => {
    

    given("The route list page", async() => {
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
      await page.type('input[name=idp]', 'https://viadees5b2.solid.community/profile/card#me', {delay: 20})
      await page.click('[class="sc-EHOje dqQDCe"]');

      //Introducimos el nombre de usuario, la contraseña y hacemos click en el botón de Log In
      await page.waitFor('input[name=username]');
      await page.$eval('[name=username]', el => el.value = 'viadees5b2');
      await page.waitFor('input[name=password]');
      await page.$eval('[name=password]', el => el.value = 'viade_es5b');
      await page.click('#login');
      await expect(page).toMatchElement("h1", { text: "¡Bienvenido a Viade!" , timeout: 3000});
      await expect(page).toMatchElement("h3", { text: "Hola viadees5b2, has iniciado sesión con este WebID:" , timeout: 30000});
    });

    when("We press publicar and enter our information", async () => {
      //Vamos a mis rutas
      await page.click('[href="#/ver-rutas"]');

      //Publicamos un comentario en la ruta
      await page.waitFor(10000);
      await page.click('[data-testid=btComment]');
      await page.waitFor(5000);
      await page.type('textArea[data-testid=commentRoute]', 'Hola', {delay: 20});
      await page.click('[data-testid=btPublicar]');

    });

    then("I expect to be a comment in the route", async () => {
      await expect(page).toMatchElement("[data-testid=listaComentarios]", { text: "Hola" , timeout: 40000});
      
    });

  }); 

});