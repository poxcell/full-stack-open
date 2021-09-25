import { createStore,combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import anecdoteReducer from "./anecdoteReducer"
import notificationReducer from "./notificationReducer"
import filterReducer from "./filterReducer"
import { composeWithDevTools } from "redux-devtools-extension"

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store