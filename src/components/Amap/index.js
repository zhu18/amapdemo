import React, { Component } from 'react';
import './style.css'
import { citys } from "../../assets/data/city.js";
import { restructureData } from "../../util/tool.js";
import { initEchart, removeEchart } from "../echarts"
class AmapBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            map: null,
            animateObj: null,
            stepOptions:null
        }
    }
    componentWillReceiveProps(nextprops) {
        this.step(this.props.locaMap, nextprops.options)
    }
    componentDidMount() {
        this.step(this.props.locaMap, this.props.options)
    }
    initMap() {
        let haloCitys = restructureData(citys, { type: 'halo' })
        let solidCitys = restructureData(citys, { type: 'solid' }, true)
        let newCitys = haloCitys.concat(solidCitys)
        // this.props.locaMap.addLayer(newCitys)

    }
    step(map, params, sCallBack) {
        if (map) {
            console.log(params)
            map.playing(params, 600)
        }
    }
    render() {
        return (
            <div className="container" id='container'>
            </div>
        );
    }
}

export default AmapBox;
