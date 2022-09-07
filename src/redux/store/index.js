import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import createSagaMiddleware from "redux-saga"
import rootReducer from "../reducers/rootReducer"
import rootSaga from "../sagas/rootSaga"

const logger = createLogger({
  duration: false, // print the duration of each action?
  timestamp: false // print the timestamp with each action?,
})

const sagaMiddleware = createSagaMiddleware();

const appReducer = combineReducers(rootReducer);

const reducerProxy = (state, action) => {
  if(action.type === 'RESET') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
export default configureStore({
  reducer: reducerProxy,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
    logger
  ]
})

sagaMiddleware.run(rootSaga)
