import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      if (isAuthenticated) {
        setIsAuthenticated(window.sessionStorage.getItem("token"));
      }
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: "user",
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => initialize(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = useCallback(() => {
    try {
      window.sessionStorage.setItem("token", "true");
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: "authUserInfo",
    });
  }, [isAuthenticated]);

  const signIn = useCallback(() => {
    try {
      window.sessionStorage.setItem("token", "true");
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: "authUserInfo",
    });
  }, [isAuthenticated]);

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
    window.sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signOut,
        setIsAuthenticated,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
