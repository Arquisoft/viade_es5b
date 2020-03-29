import React from 'react';
import Friend from '../front-end/components/friends/Friends';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

it('AddFriend', () => {
  act(() => {
    ReactDOM.render(<Friend />, container);
  });

  expect(container).toBeTruthy();

  /*expect(container.querySelector('.first')).toBeTruthy();
  expect(container.querySelector('.bold')).toBeTruthy();

  expect(container.querySelector('.input')).toBeTruthy();

  expect(container.querySelector('.mt-2')).toBeTruthy();*/
});

/*test("Presionar boton añadir y que aparezca Agregar", () => {
    const { getByTestId } = render(<AddFriend />);
    act(() =>{
        getByTestId("buttonAdd").click();
    });

    expect(getByTestId("buttonAdd")).toHaveTextContent("Agregar");
});*/

//PRUEBAS DE RENDERIZADO DE LOS COMPONENTES

test("Se renderizan bien titulos, forms, etiquetas", async () => {
  const { getByTestId }=render(<Friend></Friend>);
  
  expect(getByTestId("titleAmigos")).toHaveTextContent("Amigos");
  expect(getByTestId("gestionAmigos")).toHaveTextContent("Desde aquí puedes realizar la gestión de tus amigos.");
  expect(getByTestId("componenteAddFriend")).toBeInTheDocument();
  //dentro del componente addFriend
  expect(getByTestId("nuevoAmigo")).toHaveTextContent("Para agregar un nuevo amigo, introduce su WebID. El WebID puede cambiar según el provedor del POD del usuario.");
  expect(getByTestId("webID")).toHaveTextContent("WebID");
  expect(getByTestId("formAddFriend")).toBeInTheDocument();
  expect(getByTestId("buttonAdd")).toBeInTheDocument();

})
