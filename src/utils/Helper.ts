import { createSelector } from "reselect";
import { NPoints } from "../interfaces";

const federalRateSchedules: Array<NPoints.rateSchedule> = [{
  lowerBound: 0,
  upperBound: 47630,
  rate: 15
}, {
  lowerBound: 47630,
  upperBound: 95259,
  rate: 20.5
}, {
  lowerBound: 95259,
  upperBound: 147667,
  rate: 26
}, {
  lowerBound: 147667,
  upperBound: 210371,
  rate: 29
}, {
  lowerBound: 210371,
  upperBound: Infinity,
  rate: 33
}];

export const isInvalidDollar = (income: string): boolean => !/^\d+$/.test(income);

/*
 * @description non-memoized selector to select grossIncome from redux store state
 * @param {NPoints.IStoreState} state the only arguement implicitly passed in by redux useSelector hook
 */
export const selectGrossIncome = (state: NPoints.IStoreState) => state.grossIncome || "";

/*
 * @description memoized selector to select grossIncome from redux store state and calculate tax breakdowns.  
 *  the transform function does the re-calculation only if the grossIncome is changed, if the grossIncome is not changed
 *  the cached result is returned without doing the expensive calculation, in the latter case the component will not be re-rendered
 *  performance wins
 * @param {NPoints.IStoreState} state the only arguement implicitly passed in by redux useSelector hook
 */
export const selectTaxBreakdown = createSelector(
  selectGrossIncome,
  (grossIncome: string): Array<NPoints.taxBreakDown> => {
    const income: number = +(grossIncome || "0"),
      schedules: NPoints.IObject<number> = federalRateSchedules
        .filter((schedule: NPoints.rateSchedule) => (income === 0 && income === schedule.lowerBound) || income > schedule.lowerBound)
        .reduce((acc: NPoints.IObject<number>, cur: NPoints.rateSchedule) =>
          income > (income > 0 ? cur.lowerBound : -1) && income <= cur.upperBound ? {
            ...acc,
            line2: cur.lowerBound,
            line4: cur.rate,
            line6: acc.line6 || 0
          } : {
              ...acc,
              line6: (cur.upperBound - cur.lowerBound) * cur.rate / 100 + (acc.line6 !== undefined ? acc.line6 : 0)
            }, {} as NPoints.IObject<number>),
      line3: number = income - schedules.line2,
      line5: number = line3 * schedules.line4 / 100;

    return [
      {
        label: "Enter your taxable income from Line 260 of your return",
        amount: income,
        line: "Line 1"
      },
      {
        label: "Base amount",
        amount: `- ${schedules.line2}`,
        line: "Line 2"
      },
      {
        label: "Line 1 minus line 2 (this amount cannot be negative)",
        amount: `= ${line3}`,
        line: "Line 3"
      },
      {
        label: "Federal tax rate",
        amount: `x ${schedules.line4}%`,
        line: "Line 4"
      },
      {
        label: "Multiply the amount on line 3 by the tax rate on line 4",
        amount: `= ${Math.round(line5)}`,
        line: "Line 5"
      },
      {
        label: "Tax on the amount from line 2",
        amount: `+ ${Math.round(schedules.line6)}`,
        line: "Line 6"
      },
      {
        label: "Add lines 5 and 6",
        amount: `= ${Math.round(line5 + schedules.line6)}`,
        line: "Line 7"
      }
    ];
  }
)