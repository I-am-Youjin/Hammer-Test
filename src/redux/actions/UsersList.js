import { FETCH_USERS_REQUEST } from "redux/constants/UsersList";
export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
