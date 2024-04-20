import axios from 'axios'
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
  SCORE_DELETE_FAIL,
  SCORE_DELETE_REQUEST,
  SCORE_DELETE_SUCCESS,
} from '../constants/scoreConstants'

export const addScores = (s, best) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SCORE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      `http://localhost:4000/api/game`,
      { s, best },
      config
    )

    dispatch({
      type: ADD_SCORE_SUCCESS,
      payload: data,
    })
    localStorage.setItem('scores', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ADD_SCORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyGames = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_MY_GAMES_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `http://localhost:4000/api/game/mygames`,
      config
    )

    dispatch({
      type: LIST_MY_GAMES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LIST_MY_GAMES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteScore = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCORE_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`http://localhost:4000/api/game/mygames/${id}`, config)
    dispatch({ type: SCORE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: SCORE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAllScores = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SCORE_ALL_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`http://localhost:4000/api/game/mygames`, config)

    dispatch({ type: SCORE_ALL_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: SCORE_ALL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
