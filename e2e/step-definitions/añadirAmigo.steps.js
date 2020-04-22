const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/añadirAmigo.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {

	
  test("We want to add a friend in viade_es5b", ({ given, when, then}) => {
    

    given("Authorization from login", async() => {
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
      await expect(page).toMatchElement("h3", { text: "Hola viade5b, has iniciado sesión con este WebID:" , timeout: 3000});
    });

    when("We add a friend in the app", async () => {
      //Accedemos a la opcion para añadir un amigo
      await page.click('[href="#/friends"]');
      await expect(page).toMatchElement("h2", { text: "Amigos" , timeout: 3000});

      //Añadimos la ruta en el formulario
      await page.type('input[data-testid=formAddFriend]', 'https://luciaprado.solid.community', {delay: 20});
      await page.click('[data-testid=buttonAdd]');

       //Falta por añadir aceptar la alerta
    });


    then("I check friend was added", async () => {
      //Comprobamos que funciona añadir amigo correctamente
      await expect(page).toMatchElement("td", { text: "https://luciaprado.solid.community/profile/card#me" , timeout: 40000});
      
    });

  }); 

});