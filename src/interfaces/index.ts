export namespace NTaxCalculator {

  export interface IObject<T> {
    [key: string]: T;
  }

  export interface IStoreState {
    grossIncome: string;
  }

  export interface IIncomeAction {
    type: string;
    income: string;
  }

  export interface taxBreakDown {
    label: string;
    line: string;
    amount: number | string;
  }

  export interface rateSchedule {
    lowerBound: number;
    upperBound: number;
    rate: number;
  }

}