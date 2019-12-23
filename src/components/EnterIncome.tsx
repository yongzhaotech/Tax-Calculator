import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Action from "../action";
import { isInvalidDollar, selectGrossIncome } from "../utils/Helper";

const EnterIncome: React.FunctionComponent = () => {
  const dispatch = useDispatch(),
    history = useHistory(),
    inputElement = React.useRef<HTMLInputElement>(null),
    grossIncome: string = useSelector(selectGrossIncome),
    invalidAmount: boolean = isInvalidDollar(grossIncome);

  React.useEffect(() => {
    if (inputElement.current !== null) {
      inputElement.current.focus();
    }
  });

  return (
    <div>
      <h2>Tax Calculator</h2>
      <div className="form-group">
        <label htmlFor="gross-income">Annual gross income:</label>
        <input
          ref={inputElement}
          id="gross-income"
          className="form-control"
          aria-describedby="amount-helper"
          maxLength={10}
          value={grossIncome}
          onChange={
            e => {
              dispatch(Action.enterGrossIncome(e.target.value));
            }
          }
        />
        <small id="amount-helper" className="form-text text-muted">Enter a dollar amount for your gross income.</small>
      </div>
      <div className="form-group">
        <button
          type="button"
          className={`btn ${invalidAmount ? "btn-secondary" : "btn-success"}`}
          onClick={
            () => {
              history.push("/tax-breakdown");
            }
          }
          disabled={invalidAmount}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EnterIncome;