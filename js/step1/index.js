var step1Loca,layer, mapBorderLayer, bgLayer,intervalLocalMap;
setStepInstance(1,{
    destroyTime: 700,
    load(t) {
        setTimeout(function () {
            tasks = [];
            map.setCenter([99.515396, 39.998597]);
            map.setZoom(4.4);
            // map2.setCenter([99.515396, 39.998597]);
            // map2.setZoom(4.4);
            setPitch(0);
            setRotation(0);

            addBGLayer();
            addMapBorderLayer();
            addLocaMap();
            //addCircleLayer();
            $("#container").addClass('loaded');;
            $("#container2").removeClass('loaded');
        }, lastStep==2?5000:(t - 200))
    },
    destroy() {

        //$("#container").addClass('loaded');
        //$("#container2").removeClass('loaded');
        clearInterval(intervalLocalMap);
        bgLayer ? bgLayer.hide() : null;
        setTimeout(function(){
            step1Loca?step1Loca.destroy():null;
        });
        setTimeout(function(){
            mapBorderLayer ? mapBorderLayer.hide() : null;
        },500);
        
    }
});


function addLocaMap() {

    step1Loca = new Loca(map)
    layer = Loca.visualLayer({
        container: step1Loca,
        type: 'point',
        shape: 'circle'
    });

    var realEnts = util.restructureData2(allCitys);
    var allEnts = citys.concat(realEnts);
    layer.setData(allEnts, {
        lnglat: 'lnglat'
    });

    intervalLocalMap = setInterval(function () {

        layer.setOptions({
            style: {
                // 支持动态回调，为每一个点设置半径
                radius: function (obj) {
                    // 城市类型，0：省会直辖市，1：地级市，2：区县
                    var style = obj.value.style;
                    var r;
                    if (style == 0) {
                        r = 6;
                    } else if (style == 1) {
                        r = parseInt(Math.random()*4);
                    }else if(style == 4){
                        r=8;
                    } else {
                        r = parseInt(Math.random()*3);
                    }

                    return r;
                },
                color: '#47aff7',
                borderColor: '#c3faff',
                borderWidth: 1,
                opacity: 0.8
            }
        });
        layer.render();
    },500);

    return;
    layer.setOptions({
        mode: 'count',
        colorScale: 'quantile',
        gradient: ['#ecda9a', '#efc47e', '#f3ad6a', '#f7945d', '#f97b57', '#f66356', '#ee4d5a'],
        style: {
            stroke: '#4e4e4e',
            lineWidth: 3
        }
    });
    var haloCitys = util.restructureData(citys, {type: 'halo'})
    var solidCitys = util.restructureData(citys, {type: 'solid'}, true)
    var newCitys = haloCitys.concat(solidCitys)
    layer.setData(newCitys, {
        lnglat: 'lnglat'
    });
    var colors = {
        orange: ['#FFE7CB', '#FF8850', '#FF5005'],
        green: ['#E9FFE3', '#59FF5B', '#07FF23'],
        sky: ['#D9FFF7', '#62FFFF', '#00FFFF'],
        sky2: ['#0c6dc5', '#fff', '#0fdbea'],
        blue: ['#D7D5FF', '#7355FF', '#4100FF'],

    }
    layer.setOptions({
        style: {
            // 默认半径单位为像素
            radius: function (obj) {
                // 城市类型，0：省会直辖市，1：地级市，2：区县
                var style = obj.value.style;
                var isHalo = obj.value.type === 'halo';
                var r;

                if (style == 0) {
                    r = isHalo ? 10 : 5;
                } else if (style == 1) {
                    r = isHalo ? 8 : 2;
                } else {
                    r = isHalo ? 5 : 1;
                }
                return r;
            },
            fill: function (obj) {
                var style = obj.value.style;
                var color;
                var cls = colors['sky2'];
                if (style == 0) {
                    color = cls[0];
                } else if (style == 1) {
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
                if (type == 'solid') {
                    opacity = .6;
                } else if (type == 'halo') {
                    opacity = .3;
                }

                return opacity
            }
        }
    });

    layer.render();
}


function addBGLayer() {

    bgLayer = new AMap.ImageLayer({
        bounds: new AMap.Bounds([39.637711, 5.598022], [170.793603, 62.672368]),
        url: '../../img/big-bg3.png',
        opacity: 1,
        visible: true
    });
    bgLayer.setMap(map);
}

function addCircleLayer() {

    var circleLayer = new AMap.ImageLayer({
        bounds: new AMap.Bounds([63.28813, 5.598022], [146.076575, 62.672368]),
        url: '../../img/circle0.png',
        opacity: 1,
        visible: true,
        rejectMapMask: true
    });
    circleLayer.setMap(map);
}

function addMapBorderLayer() {
    if (mapBorderLayer) {
        mapBorderLayer.show();
        return;
    }
    mapBorderLayer = new AMap.ImageLayer({
        //bounds: new AMap.Bounds([69.018388,12.533034], [143.884235,57.900369]),
        bounds: new AMap.Bounds([62.318388, 14.633034], [147.184235, 58.900369]),
        url: '../../img/map-bg2.png',
        opacity: 1,
        visible: true,
        rejectMapMask: true
    });
    mapBorderLayer.setMap(map);
}
