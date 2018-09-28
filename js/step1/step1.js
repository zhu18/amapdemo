var step1Loca, disCountry;
function step1() {

    tasks = [];
    map.setCenter([110.515396, 35.498597])
    map.setZoom(4)
    setPitch(0)
    setRotation(0)
    removeEchart();

    addBorderLayer();
    addPointLayer();
    addImageLayer();
}

function addPointLayer() {

    step1Loca = new Loca(map)
    var layer = Loca.visualLayer({
        container: step1Loca,
        type: 'point',
        shape: 'circle'
    });
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

function addBorderLayer() {

    disCountry = new AMap.DistrictLayer.Country({
        zIndex:10,
        depth:2,
        rejectMapMask: true,
        styles:{
            'nation-stroke':'#0eb2d9',
            'province-stroke':'#0eb2d9',
            'fill':function(props){//中国特有字段
                return 'rgba(11,84,181,1)'
            }
        }
    });
    disCountry.setMap(map);
}

function addImageLayer() {
    var imgLayer = new AMap.ImageLayer({
        bounds: new AMap.Bounds([54.616959, -3.812636], [164.083755, 62.376933]),
        url: './img/circle.png',
        opacity: 1,
        visible: true,
        rejectMapMask: true
    });
    imgLayer.setMap(map);
}

function destroyStep1() {
    step1Loca?step1Loca.destroy():{};
    disCountry?disCountry.hide():{};
}
