import React from "react";
import { WidgetContext } from "../context";

const clicked = () => {
  console.log(1);
};

const Sunwing: React.FunctionComponent = () => {

  const context: { [key: string]: any } = React.useContext(WidgetContext);

  return (
    <div>
      <h2>{context.lang}</h2>
      <div id="api" onClick={()=>clicked()}>
        {context.config.api}
      </div>
    </div>
  );
}

export default Sunwing;