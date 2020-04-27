const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/deleteRuta.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {

	
  test("We want to delete route into Viade_es5b", ({ given, when, then}) => {
    

    given("The route list page", async() => {
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
      });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/",{waitUntil: "load", timeout: 0}); 
      await expect(page).toMatchElement("h1", { text: "¡Bienvenido a Viade!" , timeout: 5000});
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

    when("We press 'eliminar'", async () => {
      //Accedemos al formulario para añadir una ruta
      await page.click('[href="#/add-menu"]');
      await expect(page).toMatchElement("h1", { text: "Crear una nueva ruta" , timeout: 3000});
      await page.click('[href="#/add-ruta"]');
      await expect(page).toMatchElement("h1", { text: "Añadir rutas:" , timeout: 3000});

      //Añadimos la ruta en el formulario
      await page.type('input[name=nombre]', 'Ruta 21', {delay: 20});
      await page.type('input[name=latitudInicio]', '200', {delay: 20});
      await page.type('input[name=longitudInicio]', '100', {delay: 20});
      await page.type('textArea[name=descripcion]', 'Ruta muy buena', {delay: 20});
      await page.click('[data-testid=addRouteButton]');

      //Añadimos un hito a la ruta
      await page.type('input[name=nombreHito]', 'Hito 1', {delay: 20});
      await page.type('input[name=latitudHito]', '300', {delay: 20});
      await page.type('input[name=longitudHito]', '200', {delay: 20});
      await page.click('[data-testid=addHitoButton]');

      //Salvamos ruta
      await page.click('[data-testid=saveRouteButton]');

      //Aceptamos la alerta
      page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
      });

    });

    then("I expect to be delete on route list", async () => {
      //vamos a mis rutas
      await page.click('[href="#/ver-rutas"]');

      //eliminamos la ruta
      await page.waitFor(10000);
      await page.click('[data-testid=rb-eliminar]', );
      //await page.waitFor(10000);
      //await expect(page).toMatchElement("Alert[data-testid=alerta_no_rutas]");
    });

  }); 

});