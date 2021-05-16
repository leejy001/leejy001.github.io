import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  COMMENT_LOADING_FAILURE,
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
} from "../types";
import { push } from "connected-react-router";

//Load Comment
const loadCommentsAPI = (payload) => {
  console.log(payload, "loadCommnetAPI ID");
  return axios.get(`/api/post/${payload}/comments`);
};

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);
    console.log(result, "loadComment");
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e,
    });
    yield push("/");
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

// UpLoad Comment
const uploadCommentsAPI = (payload) => {
  console.log(payload.id, "loadCommentAPI ID");
  return axios.post(`/api/post/${payload.id}/comments`, payload);
};

function* uploadComments(action) {
  try {
    console.log(action);
    const result = yield call(uploadCommentsAPI, action.payload);
    console.log(result, "UploadComment");
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_UPLOADING_FAILURE,
      payload: e,
    });
    yield push("/");
  }
}

function* watchUpLoadComments() {
  yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComments);
}

export default function* commentSaga() {
  yield all([fork(watchLoadComments), fork(watchUpLoadComments)]);
}
