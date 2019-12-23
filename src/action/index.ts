import { NPoints } from "../interfaces";

export const ENTER_GROSS_INCOME = "ENTER_GROSS_INCOME";

/*
 * @description action creators
 */
export const enterGrossIncome = (income: string = ""): NPoints.IIncomeAction => ({
  type: ENTER_GROSS_INCOME,
  income
});