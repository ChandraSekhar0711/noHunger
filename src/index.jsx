import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";

import { myTheme } from "@/styles/theme";
//import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { Home } from "./Pages/Home/Home";

import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin/Signin";
import { FirebaseApp } from "./Services/Firebase";
import { ProtectedApp } from "./App";
import { Signup } from "./Pages/Signup/Signup";
//import { About } from "./Pages/About/About";
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
