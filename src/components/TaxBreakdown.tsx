import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectTaxBreakdown, selectGrossIncome } from "../utils/Helper";
import { NTaxCalculator } from "../interfaces";
import * as Action from "../action";

const TaxBreakdown: React.FunctionComponent = () => {
  const history = useHistory(),
    dispatch = useDispatch(),
    inputElement = React.useRef<HTMLInputElement>(null),
    grossIncome: string = useSelector(selectGrossIncome),
    taxBreakdown: Array<Array<NTaxCalculator.taxBreakDown>> = useSelector(selectTaxBreakdown),
    size: number = taxBreakdown.length;

  React.useEffect(() => {
    if (inputElement.current !== null) {
      inputElement.current.focus();
    }
  });

  return (
    <div>
      <h2>Tax Breakdown</h2>
      <small className="font-weight-bold pb-2">(Annual gross income: {grossIncome})</small>
      {
        taxBreakdown
          .map((breakdown: Array<NTaxCalculator.taxBreakDown>, idx: number) => (
            <div key={idx} className="py-3">
              {
                breakdown
                  .map((taxLine: NTaxCalculator.taxBreakDown, index: number) => (
                    <div className={`row p-2 ${(index % 2) ? "bg-white" : "bg-light"}`} key={taxLine.line}>
                      <div className="col-8">{taxLine.label}</div>
                      <div className="col-2 border-bottom border-dark">
                        {
                          idx === size - 1 && index === 0 ? (
                            <input
                              ref={inputElement}
                              className="form-control"
                              maxLength={10}
                              value={taxLine.amount}
                              onChange={
                                e => {
                                  dispatch(Action.enterGrossIncome(e.target.value));
                                }
                              }
                            />
                          ) : (
                              <span>{taxLine.amount}</span>
                            )
                        }
                      </div>
                      <div className="col-2 font-weight-bold">{taxLine.line}</div>
                    </div>
                  ))
              }

            </div>
          ))
      }
      <div className="form-group">
        <button
          type="button"
          className={`btn btn-link`}
          onClick={
            () => {
              history.push("/");
            }
          }
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TaxBreakdown;