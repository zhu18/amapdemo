import React, { Component } from 'react';
import Header from "./components/header";
import AmapBox from "./components/Amap";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <AmapBox {...this.props}></AmapBox>
        <div className="echart-con">
          <div className="item" id="lineWarp">
            <div id="line" className="chart"></div>
          </div>
          <div className="item" id="hbarWarp">
            <div id="hbar" className="chart"></div>
          </div>
          <div className="item" id="baseLineWarp">
            <div id="baseLine" className="chart"></div>
          </div>
          <div className="item" id="vbarWarp">
            <div id="vbar" className="chart"></div>
          </div>
        </div>

        <div className="con-panel left-panel"></div>
        <div className="con-panel right-panel"></div>
      </div>
    );
  }
}

const RouterApp = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:step" component={App} />
        <Redirect to='/1' />
      </Switch>
    </HashRouter>
  )
}

export default RouterApp;
