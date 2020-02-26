import React from "react";
import { WidgetContext } from "../context";

const Sunwing: React.FunctionComponent = () => {

  const context: { [key: string]: any } = React.useContext(WidgetContext);

  return (
    <div>
      <h2>{context.lang}</h2>
      <div id="api">
        {context.config.api}
      </div>
    </div>
  );
}

export default Sunwing;