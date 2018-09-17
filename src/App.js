import React, { Component } from 'react';
import Header from "./components/header";
import AmapBox from "./components/Amap";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import JFmap from "./util/map";
import { Animate } from './util/animat.js';
import './App.css'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseMap: null,
      locaMap: null,
      options: null,
      stepOptions: [
        {
          beforeAction:()=>{
          },
          zoom: 4.2,
          pitch: 0,
          rotation: 0,
          callBack: () => {
            alert(123)
          }
        },
        {
          cneter: [116.369793, 40.041126],
          zoom: 10,
          pitch: 0,
          rotation: 0
        },
        [
          {
            zoom: 18,
            pitch: 30,
            rotation: 10,
            center: [116.36563, 40.051338]
          },
          {
            rotation: 100,
            center: [116.354611, 40.047382],
          }
          , {
            pitch: 50

          }
        ]
      ]

    }
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.match.params.step !== this.props.match.params.step) {
      const options = this.state.stepOptions[nextprops.match.params.step - 1]
      this.setState({
        options
      })
    }
  }
  componentDidMount() {
    let baseMap = new JFmap('container')
    let locaMap = new Animate(baseMap.getMap())
    const options = this.state.stepOptions[this.props.match.params.step - 1]
    this.setState({
      baseMap,
      locaMap
    },()=>{
      this.setState({
        options
      })
    })
    
  }
  render() {
    return (
      <div className="App">
        <Header></Header>
        <AmapBox
          options={this.state.options}
          locaMap={this.state.locaMap}>
        </AmapBox>
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
