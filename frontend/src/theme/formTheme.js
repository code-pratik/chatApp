import { createTheme } from "@mui/material";

export const loginFormTheme = createTheme({
    palette: {
      secondary: {
        main: "#655BD3",
      },
    },
    typography: {
      fontFamily: ["Public Sans", "Roboto", "Space Grotesk", "sans-serif"].join(
        ","
      ),
    },
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: "14px",
            fontWeight: "normal",
            color: "white",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:before": {
              borderBottom: "2px solid #655BD3", 
            },
            "&:hover:not($disabled):before": {
              borderBottom: "2px solid #655BD3", 
            },
            "&:hover": {
              borderBottom: "2px solid #655BD3",
            },
          },
        },
      },
    },
  });
