import {
  useState,
  useContext,
  useReducer,
  useCallback,
  createContext,
} from "react";

import PropTypes from "prop-types";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isLoading: false,
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

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

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
        skip,
        signIn,
        signOut,
        ...state,
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
