import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import userReducer from './userReducer'
import popupReducer from './popupReducer'
import blogReducer from './blogReducer'
import usersReducer from './usersReducer'

const reducer = combineReducers({
  user: userReducer,
  popup: popupReducer,
  blogs: blogReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store

