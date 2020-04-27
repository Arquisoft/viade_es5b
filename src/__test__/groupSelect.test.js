import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GroupSelect from "../front-end/components/share/GroupSelect";
import AmigoService from "../front-end/services/amigos/AmigoService";

import * as dependancy from '../BackEnd/BackMain';
import BackMain from './__mocks__/BackMain';

dependancy.default = BackMain;






let amigoService = new AmigoService();

test("Se renderizan bien los componentes de GroupSelect", () => {
    afterAll(cleanup);
    const { getByTestId, getAllByTestId } = render(<GroupSelect amigos={amigoService.getAmigos()}
      add={amigoService.addAmigo}
      delete={amigoService.deleteAmigo}></GroupSelect>);
    //let dialogo = await waitForElement(() => getByTestId("componenteModal"));
    expect(getByTestId("envoltorio")).toBeTruthy();
    expect(getAllByTestId("itemLista")).toBeTruthy();
    //let element = getAllByTestId("itemLista")
    //expect(element.children.length).toBe(3);

});
