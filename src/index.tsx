import * as React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage"
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const config = {
  key: "points-tax-calculator",
  storage,
},
  store = createStore(
    persistReducer(config, RootReducer)
  );

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("application-root")
);

serviceWorker.unregister();
