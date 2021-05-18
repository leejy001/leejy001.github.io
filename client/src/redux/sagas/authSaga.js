import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  PASSWORD_EDIT_UPLOADING_FAILURE,
  PASSWORD_EDIT_UPLOADING_REQUEST,
  PASSWORD_EDIT_UPLOADING_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
} from "../types";

// LOGIN_____________________________________________________________
const loginUserAPI = (loginData) => {
  console.log(loginData, "loginData");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({ type: LOGIN_SUCCESS, payload: result.data });
  } catch (e) {
    yield put({ type: LOGIN_FAILURE, payload: e.response });
  }
}

function* watchloginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT_____________________________________________________________
function* logoutUser() {
  try {
    yield put({ type: LOGOUT_SUCCESS });
  } catch (e) {
    yield put({ type: LOGOUT_FAILURE });
    console.log(e);
  }
}

function* watchlogoutUser() {
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

// Register_____________________________________________________________
const registerUserAPI = (req) => {
  console.log(req, "req");

  return axios.post("api/user", req);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result, "RegisterUser Data");
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// clear Error_____________________________________________________________
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
    console.error(e);
  }
}

function* watchclearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

// User Loading_____________________________________________________________
const userLoadingAPI = (token) => {
  console.log(token);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.get("api/auth/user", config);
};

function* userLoading(action) {
  try {
    console.log(action, "userLoading");
    const result = yield call(userLoadingAPI, action.payload);
    yield put({ type: USER_LOADING_SUCCESS, payload: result.data });
  } catch (e) {
    yield put({ type: USER_LOADING_FAILURE, payload: e.response });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// Edit Password Uploading_____________________________________________________________
const EditPasswordAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post(`/api/user/${payload.userName}/profile`, payload, config);
};

function* EditPassword(action) {
  try {
    console.log(action, "EditPassword");
    const result = yield call(EditPasswordAPI, action.payload);
    yield put({ type: PASSWORD_EDIT_UPLOADING_SUCCESS, payload: result });
  } catch (e) {
    yield put({ type: PASSWORD_EDIT_UPLOADING_FAILURE, payload: e.response });
  }
}

function* watchEditPassword() {
  yield takeEvery(PASSWORD_EDIT_UPLOADING_REQUEST, EditPassword);
}

export default function* authSaga() {
  yield all([
    fork(watchloginUser),
    fork(watchlogoutUser),
    fork(watchregisterUser),
    fork(watchclearError),
    fork(watchuserLoading),
    fork(watchEditPassword),
  ]);
}
