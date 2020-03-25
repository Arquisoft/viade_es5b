import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";

it('Prueba de que la aplicación ejecuta', () =>{
  afterAll(cleanup);
  const {container} = render(<App />);
  expect(container).toBeTruthy(); 
});
