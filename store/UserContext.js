import { createContext, useReducer } from "react";
import UserReducer, { initUserState } from "./UserReducer/reducer";

// RESPONSIBILITY BY: DIEP HOAI AN

/**
 * `UserContext` is a React context object for managing user state.
 *
 * It has the following properties:
 *
 * - `userState`: An object that stores the state of the user. Initially, it is set to `initUserState`.
 * - `userDispatch`: A function that dispatches actions to the user reducer. Initially, it is an empty function that takes an object with `type` and `payload` properties.
 */
export const UserContext = createContext({
  userState: initUserState,
  userDispatch: ({ type, payload }) => {},
});

/**
 * `UserContextProvider` is a React component that provides a user context to its children.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {ReactNode} props.children - The child components of this provider.
 *
 * This component uses the `useReducer` hook with `UserReducer` and `initUserState` to manage the state of the user.
 *
 * It provides the `userState` and `userDispatch` (the dispatch function returned by `useReducer`) to the `UserContext.Provider`.
 *
 * The children of this component have access to this user context.
 */
const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(UserReducer, initUserState);

  const value = { userState, userDispatch: dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
