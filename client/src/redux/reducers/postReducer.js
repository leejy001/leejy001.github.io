import {
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_WRITE_REQUEST,
  POST_WRITE_SUCCESS,
  POST_WRITE_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  POST_DETAIL_CLEAR_REQUEST,
  POST_DETAIL_CLEAR_SUCCESS,
  POST_DETAIL_CLEAR_FAILURE,
} from "../types";

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: "",
  loading: false,
  error: "",
  creatorId: "",
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.postFindResult],
        categoryFindResult: action.payload.categoryFindResult,
        postCount: action.payload.postCount,
        loading: false,
      };

    case POST_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case POST_WRITE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };

    case POST_WRITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case POST_WRITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };

    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
        loading: false,
      };

    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_DETAIL_CLEAR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_DETAIL_CLEAR_SUCCESS:
      return {
        ...state,
        postDetail: "",
        loading: false,
      };

    case POST_DETAIL_CLEAR_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case POST_EDIT_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };

    case POST_EDIT_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        loading: false,
      };

    case POST_EDIT_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case POST_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };

    case CATEGORY_FIND_SUCCESS:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false,
      };

    case CATEGORY_FIND_FAILURE:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false,
      };

    case SEARCH_REQUEST:
      return {
        ...state,
        posts: [],
        searchBy: action.payload,
        loading: true,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        searchBy: action.payload,
        searchResult: action.payload,
        loading: false,
      };

    case SEARCH_FAILURE:
      return {
        ...state,
        searchResult: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
