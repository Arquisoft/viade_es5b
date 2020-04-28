import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RegisterComponent } from "../front-end/components/authentication/register/RegisterComponente";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

it("Register", () => {
	act(() => {
		ReactDOM.render(<Router>
			<RegisterComponent providers={[]} />
		</Router>, container);
	});

	expect(container).toBeTruthy();

	expect(container.querySelector(".register-wrapper")).toBeTruthy();
	expect(container.querySelector(".panel-header")).toBeTruthy();
	expect(container.querySelector(".register-panel")).toBeTruthy();
	expect(container.querySelector(".panel-body")).toBeTruthy();
	expect(container.querySelector(".actions")).toBeTruthy();

	expect(container.querySelector(".title")).toBeTruthy();
});
