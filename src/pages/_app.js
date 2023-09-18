import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "contexts/auth-context";
import { useNProgress } from "hooks/use-nprogress";
import { createTheme } from "theme/index";
import { createEmotionCache } from "utils/create-emotion-cache";
createEmotionCache;
import { Provider } from "react-redux";
import { store } from "store/store";
import { uk } from "date-fns/locale";

import "simplebar-react/dist/simplebar.min.css";
import "sweetalert2/src/sweetalert2.scss";
import "../styles/index.css";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Koreta</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? <SplashScreen /> : getLayout(<Component {...pageProps} />)
                }
              </AuthConsumer>
            </ThemeProvider>
          </AuthProvider>
        </LocalizationProvider>
      </Provider>
    </CacheProvider>
  );
};

export default App;
