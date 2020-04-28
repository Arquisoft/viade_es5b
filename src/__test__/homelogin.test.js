import React from "react";
import HomeMessageComponent from "../front-end/components/authentication/login/HomeLogin";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import HomeLogin from "../front-end/components/authentication/login/HomeLogin";
import { render } from "@testing-library/react";

it("HomeLogin", () => {
	expect(true);
});

test("Se renderiza correctamente.", () => {
	const { getByTestId } = render(<HomeLogin></HomeLogin>);
});


// test("Aparece el texto de usuario no loggeado.", () => {
//   const { getByTestId } = render(<HomeLogin />);
//   expect(getByTestId("noLogged")).toHaveTextContent(
//     "Aún no has iniciado sesión. "
//   );
// });

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

it("HomeLogin", () => {
	act(() => {
		ReactDOM.render(<HomeMessageComponent />, container);
	});

	expect(container).toBeTruthy();
});