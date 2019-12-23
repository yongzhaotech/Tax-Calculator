import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectTaxBreakdown, selectGrossIncome } from "../utils/Helper";
import { NPoints } from "../interfaces";

const TaxBreakdown: React.FunctionComponent = () => {
  const history = useHistory(),
    grossIncome: string = useSelector(selectGrossIncome),
    taxBreakdown: Array<NPoints.taxBreakDown> = useSelector(selectTaxBreakdown);

  return (
    <div>
      <h2>Tax Breakdown</h2>
      <small className="font-weight-bold pb-2">(Annual gross income: {grossIncome})</small>
      {
        taxBreakdown
          .map((breakdown: NPoints.taxBreakDown, idx: number) => (
            <div className={`row p-2 ${(idx % 2) ? "bg-info" : "bg-warning"}`} key={breakdown.line}>
              <div className="col-8">{breakdown.label}</div>
              <div className="col-2 border-bottom border-dark">{breakdown.amount}</div>
              <div className="col-2 font-weight-bold">{breakdown.line}</div>
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