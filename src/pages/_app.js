import Head from "next/head";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "contexts/auth-context";
import { useNProgress } from "hooks/use-nprogress";
import { createTheme } from "theme/index";
import { Provider } from "react-redux";
import { store } from "store/store";

import "simplebar-react/dist/simplebar.min.css";
import "sweetalert2/src/sweetalert2.scss";
import "../styles/index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = (props) => {
  const { Component, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <div>
      <Head>
        <title>Koreta</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthConsumer>{() => getLayout(<Component {...pageProps} />)}</AuthConsumer>
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
