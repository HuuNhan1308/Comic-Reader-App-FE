import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { logOut } from "../services/LoginServices";

/**
 * `AuthContext` is a React context object for managing authentication.
 *
 * It has the following properties:
 *
 * - `token`: A string that stores the authentication token. Initially, it is an empty string.
 * - `isAuthenticated`: A boolean that indicates whether the user is authenticated. Initially, it is false.
 * - `authenticate(token)`: An asynchronous function that takes a token as a parameter. Initially, it is an empty function.
 * - `logout()`: A function that logs out the user. Initially, it is an empty function.
 */
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: async (token) => {},
  logout: () => {},
});

/**
 * `AuthContextProvider` is a React component that provides an authentication context to its children.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {ReactNode} props.children - The child components of this provider.
 *
 * This component maintains a state variable `token` for storing the authentication token.
 *
 * It provides two functions:
 *
 * - `authenticate(token)`: This function sets the token to the state and also stores it in AsyncStorage. If an error occurs while setting the token in AsyncStorage, it logs the error.
 *
 * - `logout()`: This function removes the token from AsyncStorage, logs out the user by calling the `logOut` function from `LoginServices` with the token, and then sets the token in the state to an empty string. If an error occurs while removing the token from AsyncStorage, it logs the error.
 *
 * The value provided to the `AuthContext.Provider` includes the token, a boolean indicating whether the user is authenticated, and the `logout` and `authenticate` functions.
 *
 * The children of this component have access to this authentication context.
 */
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  async function authenticate(token) {
    setToken(token);
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log("Couldn't set token to local storage: ", error);
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem("token");
      console.log(token);
      await logOut(token);
      setToken("");
    } catch (error) {
      console.log("Couldn't remove token from local storage: ", error);
    }
  }

  const value = {
    token: token,
    isAuthenticated: !!token,
    logout,
    authenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
