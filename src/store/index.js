import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'


const store = createStore(
    combineReducers({
    }),
    applyMiddleware(
        ReduxThunk   // 允许我们 dispatch() 函数
    )
)

export default store