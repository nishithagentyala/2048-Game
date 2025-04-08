import {
  ADD_SCORE_REQUEST,
  ADD_SCORE_FAIL,
  ADD_SCORE_SUCCESS,
  LIST_MY_GAMES_FAIL,
  LIST_MY_GAMES_REQUEST,
  LIST_MY_GAMES_RESET,
  LIST_MY_GAMES_SUCCESS,
  SCORE_ALL_DELETE_FAIL,
  SCORE_ALL_DELETE_REQUEST,
  SCORE_ALL_DELETE_SUCCESS,
} from "../constants/scoreConstants";

export const scoreAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SCORE_REQUEST:
      return { loading: true };
    case ADD_SCORE_SUCCESS:
      return { loading: false, scores: action.payload };
    case ADD_SCORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const scoreListMyReducer = (state = { scores: [] }, action) => {
  switch (action.type) {
    case LIST_MY_GAMES_REQUEST: {
      return { loading: true };
    }
    case LIST_MY_GAMES_SUCCESS: {
      return { loading: false, scores: action.payload };
    }
    case LIST_MY_GAMES_FAIL: {
      return { loading: false, error: action.payload };
    }
    case LIST_MY_GAMES_RESET: {
      return { scoreItems: [] };
    }
    default:
      return state;
  }
};

export const scoreAllDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case SCORE_ALL_DELETE_REQUEST:
      return { loading: true };
    case SCORE_ALL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SCORE_ALL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
