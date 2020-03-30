import React from "react";
import ReactDOM from "react-dom";
import FriendList from "../front-end/components/friends/FriendList"
import Persona from "../front-end/model/Persona"
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";

//Lista de amigos de prueba:
// Rutas de prueba
let amigos = [];
function setUp() {
  let amigo1 = new Persona(
    "Pedro",
    "https://pedro223.inrupt.net/profile/card#me"
  );
  
  let amigo2 = new Persona(
    "Alex",
    "https://hamalawindows.solid.community/profile/card#me"
  );

  amigos.push(amigo1);
  amigos.push(amigo2);
}

test("El componente se renderiza aunque no haya amigos.", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FriendList amigos={[]}></FriendList>, div);
  });

  test("Se muestra la alerta: 'Aún no tienes ningún amigo, agrega uno introduciendo su WebID' cuando no tenemos amigos", async () => {
    const { getByTestId } = render(<FriendList amigos={[]} noFriends="true"></FriendList>);
    let alertaNoAmigos = await waitForElement(() => getByTestId("alertaNoAmigos"));
    expect(alertaNoAmigos).toHaveTextContent("Aún no tienes ningún amigo, agrega uno introduciendo su WebID");
  });

  test("Hay dos amigos y se muestran dos filas en la tabla", async () => {
    setUp();//Rellenamos la lista de amigos.
    const { getByTestId }=render(<FriendList amigos={amigos}></FriendList>);
    let tablaAmigos = await waitForElement(() => getByTestId("tablaAmigos"));
    expect(tablaAmigos.children.length).toBe(2);
  });

  ;

  