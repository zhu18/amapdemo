import React, { Component } from 'react';
import Header from "../header";
import AmapBox from "../Amap";
import JFmap from "../../util/map";
import { Animate } from '../../util/animat.js';
import './index.css'
class HomeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baseMap: null,
            locaMap: null,
            options: null
        }
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.match.params.step !== this.props.match.params.step) {
            // const options = this.state.stepOptions[nextprops.match.params.step - 1]
            try {
                import(/* webpackChunkName: "options" */ `../../step/step${nextprops.match.params.step}`).then(module => {
                    let options = module.default
                    this.setState({
                        options
                    })
                });
            } catch (error) {
                console.warn('no fond this file!');
            }


        }
    }
    componentDidMount() {
        let baseMap = new JFmap('container')
        let locaMap = new Animate(baseMap.getMap())
        import(/* webpackChunkName: "options" */ `../../step/step${this.props.match.params.step}`).then(module=>{
            const options = module.default
            this.setState({
                baseMap,
                locaMap
            }, () => {
                this.setState({
                    options
                })
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

export default HomeView;
