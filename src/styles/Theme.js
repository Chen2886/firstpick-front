import { createTheme } from "@mui/material/styles";
import { orange, blue } from "@mui/material/colors";

export const buttonTheme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: orange[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: blue[800],
    },
  },
});
