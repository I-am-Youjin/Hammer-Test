import { all, put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";

function fetchUsersApi() {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((resp) => resp.data)
    .catch((error) => {
      throw error;
    });
}

function* fetchUsers() {
  try {
    const users = yield call(fetchUsersApi);
    yield put({ type: "FETCH_USERS_SUCCESS", payload: users });
  } catch (error) {
    yield put({ type: "FETCH_USERS_FAILURE", error });
  }
}

function* watchFetchUsers() {
  yield takeEvery("FETCH_USERS_REQUEST", fetchUsers);
}

export default function* rootSaga() {
  yield all([watchFetchUsers()]);
}
