import * as React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import EnterIncome from "../components/EnterIncome";
import TaxBreakdown from "../components/TaxBreakdown";

const RouteEngine: React.FunctionComponent = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<EnterIncome />
				</Route>
				<Route path="/tax-breakdown">
					<TaxBreakdown />
				</Route>
			</Switch>
		</Router>
	);
};

export default RouteEngine;
