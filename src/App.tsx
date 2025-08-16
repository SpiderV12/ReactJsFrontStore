import { AiFillSetting } from "react-icons/ai";
import LoginPage from "./LoginPages/TSX/basiclogn";
import Firststep from "./SingnPages/TSX/Singin";
import { RouterProvider } from "react-router-dom";
import { Routerspath } from "./route/routurerpaths";
import { store, persistor } from "./SateRedux/Store";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Routerspath}></RouterProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
