import axios from "axios";
import {
  ADD_SCORE_FAIL,
  ADD_SCORE_REQUEST,
  ADD_SCORE_SUCCESS,
  LIST_MY_GAMES_FAIL,
  LIST_MY_GAMES_REQUEST,
  LIST_MY_GAMES_SUCCESS,
  SCORE_ALL_DELETE_FAIL,
  SCORE_ALL_DELETE_REQUEST,
  SCORE_ALL_DELETE_SUCCESS,
} from "../constants/scoreConstants";

const getAuthConfig = (getState, contentType = "application/json") => {
  const {
    userLogin: { userInfo },
  } = getState();

  return {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      ...(contentType && { "Content-Type": contentType }),
    },
  };
};

export const addScores = (score, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SCORE_REQUEST,
    });

    const config = getAuthConfig(getState);

    const { data } = await axios.post(
      `https://two048-game-1.onrender.com/users/score`,
      { score, id },
      config
    );

    console.log(data); // optional

    dispatch({
      type: ADD_SCORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SCORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    console.log(error); // optional
  }
};

export const listMyGames = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_MY_GAMES_REQUEST,
    });
    const config = getAuthConfig(getState, null);
    const { data } = await axios.get(
      `https://two048-game-1.onrender.com/users/score/${id}`,
      config
    );

    dispatch({
      type: LIST_MY_GAMES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_MY_GAMES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAllScores = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SCORE_ALL_DELETE_REQUEST });
    const config = getAuthConfig(getState, null);

    await axios.delete(
      `https://two048-game-1.onrender.com/users/score`,
      config
    );

    dispatch({ type: SCORE_ALL_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: SCORE_ALL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
