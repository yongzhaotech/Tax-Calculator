import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Sunwing from "../components/Sunwing";
import { WidgetContext } from "../context";
import { fireEvent } from '@testing-library/react'

let container: any = null;
console.log = jest.fn();

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
});

test("Sunwing contexts are correctly rendered", () => {

	act(() => {
		render(
			<WidgetContext.Provider value={{ lang: "english", config: { api: "sunwing.ca/getUser", token: "123" } }}>
				<Sunwing />
			</WidgetContext.Provider>,
			container
		);
	});

	expect(container.querySelectorAll("h2")[0].textContent).toEqual("english");

	expect(container.querySelector("#api").textContent).toEqual("sunwing.ca/getUser");

	act(() => {
		fireEvent.click(container.querySelector("#api"));
	});

	expect(console.log).toHaveBeenCalledWith(1);

});

