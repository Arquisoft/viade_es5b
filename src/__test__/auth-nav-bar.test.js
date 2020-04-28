import AuthNavBar from "../front-end/components/AuthNavBar/auth-nav-bar.component";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
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

it("AuthNavBar", () => {
	act(() => {
		ReactDOM.render(<Router>
			<AuthNavBar />
		</Router>, container);
	});

	expect(container).toBeTruthy();
	const href = container.querySelector(".logout");
	expect(href).toBeTruthy();

	act(() => {
		href.dispatchEvent(new MouseEvent("click"));
	});

	// expect(container.querySelector('.login-panel')).toBeTruthy();
});

/* describe.only('AuthNavBar', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <AuthNavBar/>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); */
