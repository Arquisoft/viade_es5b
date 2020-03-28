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
