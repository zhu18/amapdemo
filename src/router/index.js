import React, {Component} from 'react'
import  {BrowserRouter, HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store'
import Home from '../components'


export default class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path="/:step" component={Home} />
                        <Redirect to='/1' />
                    </Switch>
                </HashRouter>
            </Provider>)
    }
}