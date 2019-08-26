import React, { Fragment } from "react";

import Navigation from "./src/routor/index";
import { Provider } from "react-redux";
import configureStore from "./src/store/index";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;
