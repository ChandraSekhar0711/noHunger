import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    dark: "#FF7308",
    light: "#FFCD69",
  },
  secondary: "#0F1B61",
  black: "#000000",
  heading: "#204B63"
};

const fonts = {
  heading: `'Poppins', sans-serif, Jost`,
  body: `'Inter', sans-serif`,
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
export const myTheme = extendTheme({ colors, fonts, config });
