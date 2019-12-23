import { NPoints } from "../interfaces";
import { combineReducers } from "redux";
import * as Action from "../action";

const grossIncome = (state: string = "", action: NPoints.IIncomeAction): string => {
  switch (action.type) {
    case Action.ENTER_GROSS_INCOME:
      return action.income.replace(/\D/g, "");
    default:
      return state;
  }
};

const RootReducer = combineReducers({
  grossIncome
});

export default RootReducer;