import React from "react";
import "./App.css";
import AuthProvider from "./containers/AuthProvider";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import MainRouter from "./routes/MainRouter";
import "./scrollbar.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "lib/utils";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DialogUtilsProvider from "lib/providers/DialogProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
  },
  overrides: {
    MuiTableCell: {
      head: {
        fontWeight: 700,
      },
    },
    MuiCssBaseline: {
      "@global": {
        html: {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        },
      },
    },
  },
});
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <DialogUtilsProvider>
              <MainRouter />
            </DialogUtilsProvider>
          </LocalizationProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
