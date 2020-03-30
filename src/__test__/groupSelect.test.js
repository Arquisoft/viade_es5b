import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GroupSelect from "../front-end/components/share/GroupSelect";

//Lista de amigos de prueba:
// Rutas de prueba
let amigos = [];
function setUp() {
  let amigo1 = new Amigo(
    "Pedro",
    "https://pedro223.inrupt.net/profile/card#me"
  );
  
  let amigo2 = new Amigo(
    "Alex",
    "https://hamalawindows.solid.community/profile/card#me"
  );

  amigos.push(amigo1);
  amigos.push(amigo2);
}

test("Se renderizan bien los componentes de GroupSelect", () => {
    afterAll(cleanup);
    const { getByTestId, getAllByTestId } = render(<GroupSelect amigos={amigos}></GroupSelect>);
    //let dialogo = await waitForElement(() => getByTestId("componenteModal"));
    expect(getByTestId("envoltorio")).toBeTruthy();
    const elements = getAllByTestId("itemLista");
    expect(elements[0]).toHaveTextContent(amigo1.getNombre());
    expect(elements[1]).toHaveTextContent(amigo2.getNombre());
});