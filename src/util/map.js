// const colors = {
//     orange: ['#FFE7CB', '#FF8850', '#FF5005'],
//     green: ['#E9FFE3', '#59FF5B', '#07FF23'],
//     sky: ['#D9FFF7', '#62FFFF', '#00FFFF'],
//     blue: ['#D7D5FF', '#7355FF', '#4100FF'],

// }
class JFmap {
    constructor(props) {
        this.map = this._initMap(props)
        this.layer=this._loca()
       
        
    }
    getMap(){
        return  this.map
    }
    _loca(){
        const map2 = new window.Loca(this.map)
        const layer = window.Loca.visualLayer({
            container: map2,
            type: 'point',
            shape: 'circle'
        });
        return layer
    }
    addLayer(data, cls = ['#FFE7CB', '#FF8850', '#FF5005']){
        this.layer.setData(data, {
            lnglat: 'lnglat'
        });
        this.layer.setOptions({
            style: {
                // 默认半径单位为像素
                radius: function (obj) {
                    // 城市类型，0：省会直辖市，1：地级市，2：区县
                    var style = obj.value.style;
                    var isHalo = obj.value.type === 'halo';
                    var r;
                    if (style === 0) {
                        r = isHalo ? 10 : 3;
                    } else if (style === 1) {
                        r = isHalo ? 8 : 2;
                    } else {
                        r = isHalo ? 5 : 1;
                    }

                    return r;
                },
                fill: function (obj) {
                    var style = obj.value.style;
                    var color;
                    if (style === 0) {
                        color = cls[0];
                    } else if (style === 1) {
                        color = cls[1];
                    } else {
                        color = cls[2];
                    }

                    return color;
                },
                lineWidth: 0,
                stroke: '#ffffff',
                opacity: function (obj) {
                    var type = obj.value.type;
                    var opacity;
                    if (type === 'solid') {
                        opacity = .6;
                    } else if (type === 'halo') {
                        opacity = .3;
                    }

                    return opacity
                }
            }
        });
        this.layer.render()

    }
    
    _initMap(container){
        return new window.AMap.Map(container, {
            resizeEnable: true,
            rotateEnable: true,
            pitchEnable: true,
            pitch: 0,
            rotation: 0,
            viewMode: '3D',//开启3D视图,默认为关闭
            buildingAnimation: true,//楼块出现是否带动画
            features: ['bg', 'road', 'point'],//隐藏默认楼块
            showLabel: false,
            mapStyle: 'amap://styles/2b5b5a7bf7d342735986be35a82f241f',
            expandZoomRange: true,
            layers: [
                new window.AMap.TileLayer({
                    zooms: [3, 18],    //可见级别
                    visible: true,    //是否可见
                    opacity: 1,       //透明度
                    zIndex: 0         //叠加层级
                }),
                new window.AMap.Buildings({
                    zooms: [5, 18],
                    zIndex: 10,
                    heightFactor: 2//2倍于默认高度，3D下有效
                })//楼块图层
            ],
            zoom: 4,
            center: [116.372169, 40.041315]
        });
    }
}


export default JFmap