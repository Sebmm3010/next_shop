import { createTheme } from "@mui/material/styles";
import { esES } from "@mui/x-data-grid";
import { esES as coreEsEs } from "@mui/material/locale";

export const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: {
        main: "#e0e0e0",
      },
      secondary: {
        main: "#0535f5",
      },
      info: {
        main: "#000300",
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          underline: "none",
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
          position: "fixed",
        },
        styleOverrides: {
          root: {
            backgroundColor: "black",
            height: 60,
          },
        },
      },

      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: 30,
            fontWeight: 600,
          },
          h2: {
            fontSize: 20,
            fontWeight: 400,
          },
          subtitle1: {
            fontSize: 18,
            fontWeight: 600,
          },
        },
      },

      MuiButton: {
        defaultProps: {
          variant: "contained",
          size: "small",
          disableElevation: true,
          color: "info",
        },
        styleOverrides: {
          root: {
            // backgroundColor: 'black',
            // color: 'white',
            textTransform: "none",
            boxShadow: "none",
            borderRadius: 10,
            ":hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
              transition: "all 0.3s ease-in-out",
            },
          },
        },
      },

      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            boxShadow: "0px 5px 5px rgba(255,255,255,0.05)",
            borderRadius: "10px",
          },
        },
      },
    },
  },
  esES,
  coreEsEs
);
