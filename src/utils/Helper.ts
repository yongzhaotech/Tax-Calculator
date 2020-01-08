import { createSelector } from "reselect";
import { NTaxCalculator } from "../interfaces";

const federalRateSchedules: Array<NTaxCalculator.rateSchedule> = [{
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
}],
  breakDownLines: Array<NTaxCalculator.taxBreakDown> = [
    {
      label: "Enter your taxable income from Line 260 of your return",
      line: "Line 1",
      amount: (arg: NTaxCalculator.IObject<number | string>): string => "" + arg.line1
    },
    {
      label: "Base amount",
      line: "Line 2",
      amount: (arg: NTaxCalculator.IObject<number | string>): string => `- ${arg.line2}`
    },
    {
      label: "Line 1 minus line 2 (this amount cannot be negative)",
      line: "Line 3",
      amount: (arg: NTaxCalculator.IObject<number | string>): string => `= ${arg.line3}`
    },
    {
      label: "Federal tax rate",
      line: "Line 4",
      amount: (arg: NTaxCalculator.IObject<number | string>): string => `x ${arg.line4}%`
    },
    {
      label: "Multiply the amount on line 3 by the tax rate on line 4",
      line: "Line 5",
      amount: (arg: NTaxCalculator.IObject<number | string>): string => `= ${arg.line5}`
    },
    {
      label: "Tax on the amount from line 2",
      line: "Line 6",
      amount: (arg: NTaxCalculator.IObject<number | string>): string => `+ ${arg.line6}`
    },
    {
      label: "Add lines 5 and 6",
      line: "Line 7",
      amount: (arg: NTaxCalculator.IObject<number | string>): string => `= ${arg.line7}`
    }
  ];;

export const isInvalidDollar = (income: string): boolean => !/^\d+$/.test(income);

/*
 * @description non-memoized selector to select grossIncome from redux store state
 * @param {NTaxCalculator.IStoreState} state the only arguement implicitly passed in by redux useSelector hook
 */
export const selectGrossIncome = (state: NTaxCalculator.IStoreState) => state.grossIncome || "";

/*
 * @description memoized selector to select grossIncome from redux store state and calculate tax breakdowns.  
 *  the transform function does the re-calculation only if the grossIncome is changed, if the grossIncome is not changed
 *  the cached result is returned without doing the expensive calculation, in the latter case the component will not be re-rendered
 *  performance wins
 * @param {NTaxCalculator.IStoreState} state the only arguement implicitly passed in by redux useSelector hook
 */
export const selectTaxBreakdown = createSelector(
  selectGrossIncome,
  (grossIncome: string): Array<Array<NTaxCalculator.taxBreakDown>> => {

    const income = +(grossIncome || "0"),
      schedulesBasedOnIncome: Array<NTaxCalculator.rateSchedule> = federalRateSchedules
        .filter((schedule) => (income === 0 && income === schedule.lowerBound) || income > schedule.lowerBound),
      numberOfSchedules: number = schedulesBasedOnIncome.length;

    return schedulesBasedOnIncome
      .reduce((acc: Array<NTaxCalculator.IObject<string | number>>, cur: NTaxCalculator.rateSchedule, index: number) => {
        const previousSchedule: any = acc[acc.length - 1] || null,
          line1 = index < numberOfSchedules - 1 ? "" : income,
          line2 = cur.lowerBound,
          line3 = line1 ? line1 - line2 : "",
          line4 = cur.rate,
          line5 = line3 ? line3 * line4 / 100 : "",
          line6 = (previousSchedule ? previousSchedule.line6 : 0) + (previousSchedule ? (previousSchedule.upperBound - previousSchedule.lowerBound) * previousSchedule.rate / 100 : 0);
        return [
          ...acc, {
            ...cur,
            line1,
            line2,
            line3,
            line4,
            line5: line5 ? Math.round(line5) : "",
            line6: Math.round(line6),
            line7: Math.round((line5 || 0) + line6)
          }
        ];
      }, [])
      .map((schedule: NTaxCalculator.IObject<string | number>) => {
        return breakDownLines
          .reduce((acc: Array<NTaxCalculator.taxBreakDown>, line: NTaxCalculator.taxBreakDown) => {
            return [
              ...acc, {
                ...line, amount: line.amount(schedule)
              }
            ];
          }, []);
      });
  }
)