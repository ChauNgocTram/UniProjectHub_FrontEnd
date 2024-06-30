import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "tailwindcss/tailwind.css";

import StepperContext from "./pages/Teams/ManageTeamProject/CreateTeam/stepper/StepperContext.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  //  <React.StrictMode>
     <StepperContext>
          {/* <Provider store={store}>
           <PersistGate loading={null} persistor={persistor}> */}
             <App />
            {/* </PersistGate>
          </Provider> */}
     </StepperContext>
  //  </React.StrictMode>
);
