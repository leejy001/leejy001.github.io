import axios from "axios";
import { push } from "connected-react-router";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  POST_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  POST_DETAIL_CLEAR_SUCCESS,
  POST_DETAIL_CLEAR_FAILURE,
  POST_DETAIL_CLEAR_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_REQUEST,
  PROFILE_LOADING_SUCCESS,
  PROFILE_LOADING_FAILURE,
  PROFILE_LOADING_REQUEST,
} from "../types";

// All posts load
const loadPostAPI = (payload) => {
  return axios.get(`/api/post/skip/${payload}`);
};

function* loadPosts(action) {
  try {
    console.log(action.payload);
    const result = yield call(loadPostAPI, action.payload);
    console.log(result, "loadPosts");
    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchLoadPosts() {
  yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

// Post upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    console.log(action, "uploadPost function");
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, "uploadPostAPI, action.payload");
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

// Post Detail
const loadPostDetailAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    console.log(action, "loadPostDetail function");
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(result, "post_detail_saga_data");
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchLoadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

// Post Detail Clear
function* loadPostDetailClear() {
  try {
    yield put({
      type: POST_DETAIL_CLEAR_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_CLEAR_FAILURE,
    });
    yield put(push("/"));
  }
}

function* watchLoadPostDetailClear() {
  yield takeEvery(POST_DETAIL_CLEAR_REQUEST, loadPostDetailClear);
}

// Post Delete
const DeletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.delete(`/api/post/${payload.id}`, config);
};

function* DeletePost(action) {
  try {
    const result = yield call(DeletePostAPI, action.payload);
    console.log(result, "DeletePost");
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
    yield put(push("/"));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, DeletePost);
}

// Post Edit Upload
const PostEditUploadAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* PostEditUpload(action) {
  try {
    const result = yield call(PostEditUploadAPI, action.payload);
    console.log(result, "PostEditUpload");
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, PostEditUpload);
}

// Category Find
const CategoryFindAPI = (payload) => {
  return axios.get(`/api/post/category/${encodeURIComponent(payload)}`);
};

function* CategoryFind(action) {
  try {
    const result = yield call(CategoryFindAPI, action.payload);
    console.log(result, "CategoryFind");
    yield put({
      type: CATEGORY_FIND_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_FIND_FAILURE,
      payload: e,
    });
  }
}

function* watchCategoryFind() {
  yield takeEvery(CATEGORY_FIND_REQUEST, CategoryFind);
}

// Category List
const CategoryListAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/post/${payload}/category`);
};

function* CategoryList(action) {
  try {
    const result = yield call(CategoryListAPI, action.payload);
    console.log(result, "CategoryList");
    yield put({
      type: CATEGORY_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_LIST_FAILURE,
      payload: e,
    });
  }
}

function* watchCategoryList() {
  yield takeEvery(CATEGORY_LIST_REQUEST, CategoryList);
}

// Search
const SearchResultAPI = (payload) => {
  return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* SearchResult(action) {
  try {
    const result = yield call(SearchResultAPI, action.payload);
    console.log(result, "SearchResult");
    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/search/${encodeURIComponent(action.payload)}`));
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, SearchResult);
}

// Profile loading
function* ProfileLoading() {
  try {
    yield put({
      type: PROFILE_LOADING_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: PROFILE_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchProfileLoading() {
  yield takeEvery(PROFILE_LOADING_REQUEST, ProfileLoading);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchuploadPosts),
    fork(watchLoadPostDetail),
    fork(watchLoadPostDetailClear),
    fork(watchDeletePost),
    fork(watchPostEditUpload),
    fork(watchCategoryFind),
    fork(watchCategoryList),
    fork(watchSearchResult),
    fork(watchProfileLoading),
  ]);
}
