import axios from "axios";
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_LOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILURE,
  COMMENT_UPLOADING_EDIT_REQUEST,
  COMMENT_UPLOADING_EDIT_SUCCESS,
  COMMENT_UPLOADING_EDIT_FAILURE,
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
    yield put(push("/"));
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments);
}

// UpLoad Comment
const uploadCommentsAPI = (payload) => {
  console.log(payload.id, "loadCommentAPI ID");
  return axios.post(`/api/post/${payload.id}/comments/`, payload);
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
    yield put(push("/"));
  }
}

function* watchUpLoadComments() {
  yield takeEvery(COMMENT_UPLOADING_REQUEST, uploadComments);
}

// UpLoad Edit Comment
const uploadEditCommentsAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log(payload, "uploadEditCommentAPI ID");
  return axios.post(
    `/api/post/${payload.id}/comments/${payload.commentId}/edit/`,
    payload,
    config
  );
};

function* uploadEditComments(action) {
  try {
    console.log(action);
    const result = yield call(uploadEditCommentsAPI, action.payload);
    console.log(result, "UploadEditComment");
    yield put({
      type: COMMENT_UPLOADING_EDIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: COMMENT_UPLOADING_EDIT_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchUpLoadEditComments() {
  yield takeEvery(COMMENT_UPLOADING_EDIT_REQUEST, uploadEditComments);
}

// Comment Delete
const DeleteCommentAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.delete(
    `/api/post/${payload.id}/comments/${payload.commentId}/`,
    config
  );
};

function* DeleteComment(action) {
  try {
    const result = yield call(DeleteCommentAPI, action.payload);
    console.log(result, "DeleteComment");
    yield put({
      type: COMMENT_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_DELETE_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchDeleteComment() {
  yield takeEvery(COMMENT_DELETE_REQUEST, DeleteComment);
}

export default function* commentSaga() {
  yield all([
    fork(watchLoadComments),
    fork(watchUpLoadComments),
    fork(watchUpLoadEditComments),
    fork(watchDeleteComment),
  ]);
}
