import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { legacy_createStore as createStore } from 'redux'
import {
  getProfileUserReducer,
  loginUserReducer,
  registerUserReducer,
  updateProfileUserReducer,
} from './reducers/userReducers'
import {
  scoreAddReducer,
  scoreListMyReducer,
  scoreAllDeleteReducers,
  scoreDeleteReducer,
} from './reducers/scoreReducer'

const reducer = combineReducers({
  userLogin: loginUserReducer,
  userRegister: registerUserReducer,
  userDetails: getProfileUserReducer,
  userUpdateProfile: updateProfileUserReducer,

  scoreAdd: scoreAddReducer,
  scoreList: scoreListMyReducer,
  scoreDelete: scoreDeleteReducer,
  scoreDeleteAll: scoreAllDeleteReducers,
})
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const scoresFromLocalStorage = localStorage.getItem('scores')
  ? JSON.parse(localStorage.getItem('scores'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  scoreAdd: { scores: scoresFromLocalStorage },
}
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)
export default store
