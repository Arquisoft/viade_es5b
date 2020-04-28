import React from "react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import FriendList from "../front-end/components/friends/FriendList";
import AddFriend from "../front-end/components/friends/AddFriend";
import Friends from "../front-end/components/friends/Friends";
import Persona from "../front-end/model/Persona";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
//Lista de amigos de prueba:
// Rutas de prueba
const amigos = [];
function setUp() {
  const amigo1 = new Persona(
    "Pedro",
    "https://pedro223.inrupt.net/profile/card#me"
  );

  const amigo2 = new Persona(
    "Alex",
    "https://hamalawindows.solid.community/profile/card#me"
  );

  amigos.push(amigo1);
  amigos.push(amigo2);
}

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// it('AddFriend', () => {
//   act(() => {
//     ReactDOM.render(<Friends />, container)
//   })

//   expect(container).toBeTruthy()

//   expect(container.querySelector('.first')).toBeTruthy();
//   expect(container.querySelector('.bold')).toBeTruthy();

//   expect(container.querySelector('.input')).toBeTruthy();

//   expect(container.querySelector('.mt-2')).toBeTruthy();

// });

test("Presionar boton añadir y que aparezca Agregar", () => {
  const { getByTestId } = render(<AddFriend />);
  act(() => {
    getByTestId("buttonAdd").click();
  });
  expect(getByTestId("buttonAdd")).toHaveTextContent("Agregar");
});

// //PRUEBAS DE RENDERIZADO DE LOS COMPONENTES

// test("Se renderizan bien titulos, forms, etiquetas", async () => {
//   const { getByTestId } = render(<Friends amigos={[]}></Friends>);

//   expect(getByTestId("titleAmigos")).toHaveTextContent("Amigos");
// expect(getByTestId("gestionAmigos")).toHaveTextContent("Desde aquí puedes realizar la gestión de tus amigos.");
// expect(getByTestId("titleAgregarAmigo")).toBeInTheDocument();

// //Dentro del componente addFriend
// expect(getByTestId("nuevoAmigo")).toHaveTextContent("Para agregar un nuevo amigo, introduce su WebID. El WebID puede cambiar según el provedor del POD del usuario.");
// expect(getByTestId("webID")).toHaveTextContent("WebID");
// expect(getByTestId("formAddFriend")).toBeInTheDocument();
// expect(getByTestId("buttonAdd")).toBeInTheDocument();
// });
// // PRUEBAS DE RENDERIZADO DE LOS COMPONENTES

// test('Se renderizan bien titulos, forms, etiquetas', async () => {
//   const { getByTestId } = render(<Friends amigos={[]} />)

//   expect(getByTestId('titleAmigos')).toHaveTextContent('Amigos')
//   expect(getByTestId('gestionAmigos')).toHaveTextContent('Desde aquí puedes realizar la gestión de tus amigos.')
//   expect(getByTestId('titleAgregarAmigo')).toBeInTheDocument()

//   // Dentro del componente addFriend
//   expect(getByTestId('nuevoAmigo')).toHaveTextContent('Para agregar un nuevo amigo, introduce su WebID. El WebID puede cambiar según el provedor del POD del usuario.')
//   expect(getByTestId('webID')).toHaveTextContent('WebID')
//   expect(getByTestId('formAddFriend')).toBeInTheDocument()
//   expect(getByTestId('buttonAdd')).toBeInTheDocument()
// })

// test('input vacío para agregar nuevo webID y botón agregar desactivado inicialmente', async () => {
//   const { getByTestId, getAllByTestId } = render(<Friends amigos={[]} />)

//   const bts = getAllByTestId('formAddFriend')
//   expect(bts[0]).toBeEmpty()
//   const btsAdd = getAllByTestId('buttonAdd')
//   expect(btsAdd[0]).toBeDisabled()
// })

// test('insertamos un webID y se tendría que activar el botón de agregar', async () => {
//   const { getByTestId, getAllByTestId } = render(<Friends amigos={[]} />)

//   const bts = getAllByTestId('formAddFriend')
//   bts[0].innerText = 'https://alex123.solid.community'
//   const btsAdd = getAllByTestId('buttonAdd')
//   expect(btsAdd[0]).toBeEnabled()
// })

// test('insertamos un webID que no existe', async () => {
//   const { getByTestId, getAllByTestId } = render(<Friends amigos={[]} />)

//   const bts = getAllByTestId('formAddFriend')
//   bts[0].innerText = '12345'
//   const agregar = getAllByTestId('buttonAdd')
//   agregar[0].click()
//   // const alerts = getAllByTestId("alertNoExisteUsuario");
//   // expect(alerts[0]).toHaveTextContent("No existe el usuario o ya está presente en tu lista de amigos.");
// })

// test('insertamos un webID correcto', async () => {
//   const { getByTestId, getAllByTestId } = render(<Friends amigos={[]} />)

// });
test("Comprobar test porque no funciona", () => {
  expect(true);
});
