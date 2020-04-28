import React from "react";
import ReactDOM from "react-dom";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import VerRutas from "../front-end/components/ruta/VerRutas/VerRutas";

import RutaService from "../front-end/services/rutas/RutaService";
import AmigoService from "../front-end/services/amigos/AmigoService";

import * as dependancy from "../BackEnd/BackMain";
import BackMain from "./__mocks__/BackMain";
jest.mock("../front-end/services/rutas/RutaService");
jest.mock("../front-end/services/amigos/AmigoService");

dependancy.default = BackMain;
let rutaService = new RutaService();
let amigoService = new AmigoService();


// Ruta de prueba
const ruta = new Ruta("Ruta Avilés", [4.5, 5.4], "Muy buena ruta, entretenida.");
const hito1 = new Hito("Niemeyer", 4, 3.2);
const hito2 = new Hito("Parque Ferrera", 4.5, 5.7);
ruta.addHito(hito1);
ruta.addHito(hito2);
console.log("-------------------" + ruta.getHitos().length);

jest.mock("../front-end/components/ruta/VerRutas/RouteList", () => {
	return {
		__esModule: true,
		default: () => {
			return <div></div>;
		},
	};
});

test("se renderiza sin fallos", () => {
	const div = document.createElement("div");
	const{getByTestId} = render(<VerRutas></VerRutas>, div);
	expect(getByTestId("titleVerRutas")).toHaveTextContent("Mis rutas");
});
