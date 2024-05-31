import {
  SET_ALL,
  SET_FULLNAME,
  SET_EMAIL,
  SET_DATE_OF_BIRTH,
  SET_IS_MALE,
  CLEAR_ALL,
  SET_ALL_EXCEPT_EMAIL,
  SET_BOOKMARKS,
} from "./constants";

// RESPONSIBILITY BY: DIEP HOAI AN

export const initUserState = {
  id: null,
  fullName: null,
  email: null,
  dateOfBirth: null,
  isMale: null,
  bookmarks: [],
};

/**
 * UserReducer is a reducer function for managing the state of a user.
 *
 * @param {Object} state - The current state of the user.
 * @param {Object} action - An action object that contains a type and a payload.
 *
 * The function uses a switch statement to handle different types of actions:
 *
 * - SET_FULLNAME: Sets the fullName property of the state to the payload of the action.
 * - SET_EMAIL: Sets the email property of the state to the payload of the action.
 * - SET_DATE_OF_BIRTH: Sets the dateOfBirth property of the state to the payload of the action.
 * - SET_IS_MALE: Sets the isMale property of the state to the payload of the action.
 * - SET_ALL: Merges the payload of the action with the current state.
 * - SET_ALL_EXCEPT_EMAIL: Sets the fullName, dateOfBirth, and isMale properties of the state to the corresponding properties of the action's payload.
 * - SET_BOOKMARKS: Sets the bookmarks property of the state to the payload of the action.
 * - CLEAR_ALL: Resets the state to the initial user state.
 *
 * If the action type does not match any of the cases, the function returns the current state.
 */
const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_FULLNAME:
      return {
        ...state,
        fullName: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_DATE_OF_BIRTH:
      return {
        ...state,
        dateOfBirth: action.payload,
      };
    case SET_IS_MALE:
      return {
        ...state,
        isMale: action.payload,
      };
    case SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ALL_EXCEPT_EMAIL:
      return {
        ...state,
        fullName: action.payload.fullName,
        dateOfBirth: action.payload.dateOfBirth,
        isMale: action.payload.isMale,
      };
    case SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };
    case CLEAR_ALL:
      return { ...initUserState };
    default:
  }
};

export default UserReducer;
