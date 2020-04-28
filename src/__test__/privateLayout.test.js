import React from "react";
import PrivateLayout from "../front-end/layouts/PrivateLayout/private.layout";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LogInComponent from "../front-end/components/authentication/login/Login";

it("PrivateLayout", () => {
	expect(true);
});

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

it("PrivateLayout", () => {
	act(() => {
		ReactDOM.render(<Router><PrivateLayout
			exact
			path='/login'
			component={LogInComponent}
		/>
		</Router>, container);
	});
	expect(container).toBeTruthy();
});
