import * as React from "react";
import { NTaxCalculator } from "../interfaces";

export const WidgetContext = React.createContext<NTaxCalculator.IObject<any>>({} as NTaxCalculator.IObject<any>);