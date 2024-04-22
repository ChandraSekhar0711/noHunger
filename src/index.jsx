import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";

import { myTheme } from "@/styles/theme";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FirebaseApp } from "./Services/Firebase";
import { ProtectedApp } from "./App";
import { Signup } from "./Pages/Signup/Signup";
import { Signin } from "./Pages/Signin/Signin";
FirebaseApp.init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider theme={myTheme}>
      <ColorModeScript initialColorMode={myTheme.config.initialColorMode} />
      <BrowserRouter>
        <Routes>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
        <ProtectedApp />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
