import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { fireEvent } from '@testing-library/react'
import EnterIncome from "../components/EnterIncome";

let grossIncome = "97800",
	container: any = null,
	store: any = null,
	push = jest.fn();

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: push,
	}),
}));

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
	store = mockStore({ grossIncome: grossIncome });
	store.dispatch = jest.fn();
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
	store = null;
});

test("Renders EnterIncome component correctly", () => {

	act(() => {
		render(
			<Provider store={store} >
				<EnterIncome />
			</Provider>,
			container);
	});

	// all texts rendered
	expect(container.textContent).toBe("Tax CalculatorAnnual gross income:Enter a dollar amount for your gross income.Submit");

	// store state value rendered inside the input field
	expect(container.querySelector("input#gross-income").value).toBe(grossIncome);

	// submit button is enabled because grossIncome value is valid
	expect(container.querySelector("button").disabled).toBeFalsy();

	// simulate to change the income entry to 25000
	act(() => {
		fireEvent.change(container.querySelector("input#gross-income"), { bubbles: true, target: { value: "25000" } });
	});
	// income value changes and the correct action is dispatched
	expect(store.dispatch).toHaveBeenCalledWith({ income: "25000", type: "ENTER_GROSS_INCOME" });

	// simulate to click on the Submit button
	act(() => {
		fireEvent.click(container.querySelector("button"));
	});
	// react-router location pathname is changed to "/tax-breakdown" - tax breakdown screen
	expect(push).toHaveBeenCalledWith("/tax-breakdown");

});

test("Disable submit button when gross income is blank in the state", () => {

	store = mockStore({ grossIncome: "" });
	act(() => {
		render(
			<Provider store={store} >
				<EnterIncome />
			</Provider>,
			container);
	});

	expect(container.querySelector("button").disabled).toBeTruthy();

});

