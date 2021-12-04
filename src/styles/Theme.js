import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#512DA8",
    },
    secondary: {
      main: "#FFC107",
    },
  },
  typography: {
    fontFamily: `'Montserrat', sans-serif`,
  },
  shadows: ["none"],
});

export default theme;
