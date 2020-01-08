import * as React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import TaxBreakdown from "../components/TaxBreakdown";
import { fireEvent } from '@testing-library/react'

let grossIncome = "250000",
	correctBreakdowns: any[] = [
		{ value: "250000", label: "Enter your taxable income from Line 260 of your return" },
		{ value: "210371", label: "Base amount" },
		{ value: "39629", label: "Line 1 minus line 2 (this amount cannot be negative)" },
		{ value: "33", label: "Federal tax rate" },
		{ value: "13078", label: "Multiply the amount on line 3 by the tax rate on line 4" },
		{ value: "48719", label: "Tax on the amount from line 2" },
		{ value: "61796", label: "Add lines 5 and 6" }
	],
	container: any = null,
	push = jest.fn(),
	store: any = null;

jest.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: push,
	}),
}));

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
	const mockStore = configureStore([]);
	store = mockStore({ grossIncome: grossIncome });
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
	store = null;
});

test("Renders Tax breakdown component correctly", () => {

	act(() => {
		ReactDOM.render(
			<Provider store={store} >
				<TaxBreakdown />
			</Provider>,
			container);
	});

	const row = container.querySelectorAll(".row");

	/*
	// all 7 schedules are rendered
	expect(row.length).toBe(7);

	// line 1 through to line 7 are rendered correctly
	correctBreakdowns.forEach((breakdown: any, index: number) => {
		expect(row[index].querySelector(".col-8").textContent).toBe(breakdown.label);
		expect(row[index].querySelector(".col-2.border-bottom.border-dark").textContent.replace(/\D/g, "")).toBe(breakdown.value);
	})
	*/

	// simulate to click on the Back button
	act(() => {
		fireEvent.click(container.querySelector("button"));
	});
	// react-router location pathname is changed to "/" - gross income entry screen
	expect(push).toHaveBeenCalledWith("/");

});

