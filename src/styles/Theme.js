import { createTheme } from "@material-ui/core";
import { blueGrey, lightBlue } from "@material-ui/core/colors";

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
  shadows: ["none"],
});

export default theme;
