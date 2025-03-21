import { FETCH_USERS_REQUEST } from "../constants/UsersList";

const initState = {
  users: [],
  loading: false,
  error: null,
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default usersReducer;
