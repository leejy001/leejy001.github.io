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

const initialState = {
  comments: [],
  loading: false,
  isAuthenticated: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_LOADING_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case COMMENT_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case COMMENT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_UPLOADING_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        isAuthenticated: true,
        loading: false,
      };
    case COMMENT_UPLOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case COMMENT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case COMMENT_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case COMMENT_UPLOADING_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COMMENT_UPLOADING_EDIT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case COMMENT_UPLOADING_EDIT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
