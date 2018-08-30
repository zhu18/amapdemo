import React, { Component } from 'react';
import Amap from "../../util/map";
import './style.css'
import { citys } from "../../data/city.js";
import { restructureData } from "../../util/tool.js";
import {Animate} from '../../util/animat.js';
import { initEchart, removeEchart} from "../echarts"
class AmapBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            map: null,
            animateObj:null,
            stepOptions: [
                {
                    zoom: 4.2,
                    pitch: 0,
                    rotation: 0,
                    callBack: () => {
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
    componentDidMount() {
        this.initMap()
        setTimeout(() => {
            this.step(this.state.animateObj, this.state.stepOptions, this.props.match.params.step)
        }, 0);
        this.props.history.listen((params)=>{
            let step = this.props.history.location.pathname.substring(1)
            if (Math.floor(step) === 3) {
                initEchart()
            } else {
                removeEchart()
            }
            this.step(this.state.animateObj, this.state.stepOptions, step)
        })
    }
    initMap() {
        let map = new Amap('container')
        let map2 = map.getMap()
        this.setState({
            map: map2,
            animateObj: new Animate(map2)
        })
        let haloCitys = restructureData(citys, { type: 'halo' })
        let solidCitys = restructureData(citys, { type: 'solid' }, true)
        let newCitys = haloCitys.concat(solidCitys)
        map.addLayer(newCitys)

    }
    step(map,params, step, sCallBack) {
        if (Array.isArray(params) && params.length > 0) {
            map.playing(params[step - 1], 600)
        } else {
            console.warn('参数错误!')
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
