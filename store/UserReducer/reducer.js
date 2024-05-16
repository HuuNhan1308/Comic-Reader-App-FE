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

export const initUserState = {
  id: null,
  fullName: null,
  email: null,
  dateOfBirth: null,
  isMale: null,
  bookmarks: [],
};

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
